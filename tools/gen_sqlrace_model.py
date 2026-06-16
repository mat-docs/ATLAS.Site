"""Generate docs/javascripts/sqlrace-model.js from the curated, xrefmap-verified
SQL Race object model. Run: python tools/gen_sqlrace_model.py

- Curated NODES/EDGES define the high-level map (every edge member is validated).
- Each node is then ENRICHED with its full method/property list (with doc deep-links)
  pulled straight from the DocFX xrefmap, so clicking a class shows all its members.
"""
import re, os, json, urllib.request
from collections import defaultdict

DOC_BASE = "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/"
EX = "/developer-resources/atlas/sql-race/examples/"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "docs", "javascripts", "sqlrace-model.js"))

# --- Load xrefmap (cached in TEMP, else download) ---
cache = os.path.join(os.environ.get("TEMP", "."), "xrefmap.yml")
if not os.path.exists(cache):
    urllib.request.urlretrieve(DOC_BASE + "xrefmap.yml", cache)
txt = open(cache, encoding="utf-8").read()

refs = []
for b in ("\n" + txt).split("\n- uid: ")[1:]:
    uid = b.split("\n", 1)[0].strip()
    hm = re.search(r"^\s*href:\s*(.+)$", b, re.M)
    cm = re.search(r"^\s*commentId:\s*(.+)$", b, re.M)
    refs.append((uid, hm.group(1).strip() if hm else None, cm.group(1).strip() if cm else ""))

cset = set(c for _, _, c in refs)
href_by_uid = {u: h for u, h, _ in refs if h}
def has_type(uid): return ("T:" + uid) in cset
def has_member(typ, m):
    return ("P:%s.%s" % (typ, m)) in cset or ("M:%s.%s" % (typ, m)) in cset \
        or any(c.startswith("M:%s.%s(" % (typ, m)) for c in cset)

# --- Build full member index per type (methods / properties, with doc hrefs) ---
SKIP = {"Equals", "GetHashCode", "ToString", "GetType", "MemberwiseClone", "Finalize"}
props = defaultdict(dict)   # type -> {name: href}
meths = defaultdict(dict)
def clean(name): return name.split("`")[0]
for uid, href, cid in refs:
    if not href:
        continue
    if cid.startswith("P:"):
        typ, _, name = uid.rpartition(".")
        name = clean(name)
        if name and "." not in name and not name.startswith(("get_", "set_", "add_", "remove_", "#")) and name not in SKIP:
            props[typ].setdefault(name, href)
    elif cid.startswith("M:"):
        typ, _, name = uid.split("(")[0].rpartition(".")
        name = clean(name)
        if name and "." not in name and not name.startswith(("get_", "set_", "add_", "remove_", "op_", "#")) and name not in SKIP:
            meths[typ].setdefault(name, href)

def member_list(uid, edgeset):
    def mk(d):
        return [{"name": n, "href": DOC_BASE + d[n], "edge": n in edgeset} for n in sorted(d)]
    return mk(meths.get(uid, {})), mk(props.get(uid, {}))

D = "MESL.SqlRace.Domain."
# id, uid, category, blurb, example-path
NODES = [
 ("SessionManager", D+"SessionManager", "connect", "Entry point - create, load, query, export and compose sessions.", "session-loading/"),
 ("IClientSession", D+"IClientSession", "connect", "Handle to an open session; exposes the Session and its lifecycle.", "session-loading/"),
 ("SessionKey", "MAT.OCS.Core.SessionKey", "connect", "GUID that uniquely identifies a session.", "session-loading/"),
 ("Session", D+"Session", "structure", "The session itself: data, configuration, laps, markers and events.", "session-loading/"),
 ("CompositeSession", D+"CompositeSession", "structure", "A read-only session overlaying several sessions (lap / session compare).", "session-loading/"),
 ("Lap", D+"Lap", "structure", "A lap / segment with a start-end time range.", "parameter-data-access/#lap-statistics"),
 ("Marker", D+"Marker", "structure", "An annotated time range (region of interest) on the session.", "session-loading/"),
 ("Event", D+"Event", "structure", "A logged event instance at a point in time.", "session-loading/"),
 ("EventDefinition", D+"EventDefinition", "structure", "Defines an event type - its priority and group.", "session-loading/"),
 ("ConfigurationSet", D+"ConfigurationSet", "configure", "Describes the data: channels, parameters, conversions and groups.", "create-session/"),
 ("ConfigurationSetManager", D+"ConfigurationSetManager", "configure", "Creates and manages configuration sets.", "create-session/"),
 ("Channel", D+"Channel", "configure", "A raw data stream - periodic, row or synchro.", "create-session/"),
 ("Parameter", D+"Parameter", "configure", "A named signal bound to a channel and a conversion.", "create-session/"),
 ("RationalConversion", D+"RationalConversion", "configure", "Maps raw channel values to engineering units.", "create-session/"),
 ("ParameterGroup", D+"ParameterGroup", "configure", "A logical grouping of related parameters.", "create-session/"),
 ("ApplicationGroup", D+"ApplicationGroup", "configure", "Application context that organises parameter groups.", "create-session/"),
 ("ParameterDataAccess", D+"ParameterDataAccessBase", "read", "Reads samples and resampled data; positions a read cursor.", "parameter-data-access/"),
 ("ParameterValues", "MAT.OCS.Core.ParameterValues", "read", "The returned data: values, timestamps and data status.", "parameter-data-access/#data-status"),
 ("Statistics", D+"Infrastructure.Interfaces.IParameterDataStatistics", "read", "Aggregate statistics: min, max, mean, std-dev, regression.", "parameter-data-access/#lap-statistics"),
 ("FunctionManagerFactory", D+"Functions.FunctionManagerFactory", "functions", "Creates a function (calculated-channel) manager.", "functions/"),
 ("FunctionManager", D+"Functions.IFunctionManager", "functions", "Defines, builds and manages calculated-channel functions.", "functions/"),
 ("FunctionDefinition", D+"Functions.IFunctionDefinition", "functions", "A calculated channel's definition: code, inputs and output.", "functions/"),
]
# source-id, member, target-id, kind
EDGES = [
 ("SessionManager", "CreateSession", "IClientSession", "call"),
 ("SessionManager", "Load", "IClientSession", "call"),
 ("SessionManager", "CreateCompositeSession", "CompositeSession", "call"),
 ("SessionManager", "CreateSession", "SessionKey", "uses"),
 ("IClientSession", "Session", "Session", "nav"),
 ("Session", "CreateConfiguration", "ConfigurationSet", "call"),
 ("ConfigurationSetManager", "Create", "ConfigurationSet", "call"),
 ("ConfigurationSet", "AddChannel", "Channel", "call"),
 ("ConfigurationSet", "AddParameter", "Parameter", "call"),
 ("ConfigurationSet", "AddConversion", "RationalConversion", "call"),
 ("ConfigurationSet", "AddParameterGroup", "ParameterGroup", "call"),
 ("ConfigurationSet", "AddGroup", "ApplicationGroup", "call"),
 ("Session", "CreateParameterDataAccess", "ParameterDataAccess", "call"),
 ("Session", "LapCollection", "Lap", "nav"),
 ("Session", "Markers", "Marker", "nav"),
 ("Session", "Events", "Event", "nav"),
 ("Session", "EventDefinitions", "EventDefinition", "nav"),
 ("Session", "Parameters", "Parameter", "nav"),
 ("Session", "AddChannelData", "Channel", "write"),
 ("Session", "AddSynchroChannelData", "Channel", "write"),
 ("ParameterDataAccess", "GetNextData", "ParameterValues", "call"),
 ("ParameterDataAccess", "GetNextSamples", "ParameterValues", "call"),
 ("ParameterDataAccess", "GetLapStatistics", "Statistics", "call"),
 ("FunctionManagerFactory", "Create", "FunctionManager", "call"),
 ("FunctionManager", "CreateFunctionDefinition", "FunctionDefinition", "call"),
]

uid_by_id = {n[0]: n[1] for n in NODES}
edge_members = defaultdict(set)
for s, m, t, k in EDGES:
    edge_members[s].add(m)

warn = []
out_nodes = []
for nid, uid, cat, blurb, ex in NODES:
    if not has_type(uid) and not uid.startswith("MAT.OCS.Core."):
        warn.append("NODE not in xrefmap: %s" % uid)
    ms, ps = member_list(uid, edge_members.get(nid, set()))
    out_nodes.append({
        "id": nid, "uid": uid, "category": cat, "blurb": blurb,
        "doc": (DOC_BASE + href_by_uid[uid]) if uid in href_by_uid else None,
        "example": EX + ex, "methods": ms, "properties": ps
    })

out_edges = []
for s, m, t, kind in EDGES:
    suid = uid_by_id[s]
    if not suid.startswith("MAT.OCS.Core.") and not has_member(suid, m):
        warn.append("EDGE member missing: %s.%s" % (suid, m))
    out_edges.append({"source": s, "target": t, "label": m, "kind": kind})

if warn:
    print("VALIDATION WARNINGS:")
    for w in warn: print("  -", w)
else:
    print("All nodes and edge members verified against xrefmap.")

tot_m = sum(len(n["methods"]) for n in out_nodes)
tot_p = sum(len(n["properties"]) for n in out_nodes)
model = {"nodes": out_nodes, "edges": out_edges, "docBase": DOC_BASE}
js = "/* AUTO-GENERATED from xrefmap.yml by tools/gen_sqlrace_model.py - do not edit by hand. */\n"
js += "window.SQLRACE_MODEL = " + json.dumps(model, indent=2) + ";\n"
open(OUT, "w", encoding="utf-8").write(js)
print("Wrote %s (%d nodes, %d edges, %d methods + %d properties indexed)" %
      (OUT, len(out_nodes), len(out_edges), tot_m, tot_p))
