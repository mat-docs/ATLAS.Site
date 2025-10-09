# Setup Guide

This guide will cover the process of installing SQL Server, setting up a SQL Race Database, and connecting your database to ATLAS ready to start reading and writing data.

## Installing SQLServer

Download and install SQL Server 2019 or 2022 from the [Microsoft SQL Server Downloads](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) page. 

!!! note
    Express will work too but it has limited size so it's not recommended to use for larger datasets. 

![Custom Installation](assets/developer_edition.png){: style="width:75%;"}

Once the installer has been downloaded, run it and select the 'Custom' installation type and follow the prompts to complete the installation after which the installation center will open. 

![installation center](assets/setup_wizard.png){: style="width:75%;"}

Go to **Installation** and select **New SQL Server stand-alone installation** at the top. Click through the wizard, if you need SQL Server Replication, make sure the checkbox is selected on the **Feature Selection** page.

![Feature Selection](assets/feature_selection.png){: style="width:75%;"}

Give the instance a name on the **Instance Configuration** page. It's recommended to use a named instance (like `LOCAL`) instead of leaving it blank, which does not work well with SQL Race Functions. 

![Custom Installation](assets/database_config.png){: style="width:75%;"}

In **Database Engine Configuration** ensure Windows authentication mode is selected and add the current user to the SQL Server administrators. Go the the **FILESTREAM** tab and enable all three options, and add your instance name to the Windows share name (e.g. `LOCAL`).

![Filestrean](assets/filestream.png){: style="width:75%;"}

## Installing SQL Server Management Studio (SSMS)

You can download SQL Server Management Studio (SSMS) from the [Download SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms) page. Or from the INstalaller center after installing SQL Server by going to **Tools > Install SQL Server Management Tools**.

## Configuring Firewall

If you want to access the SQL Server instance from another machine, you need to configure the firewall to allow incoming connections via certain ports. Open PowerShell as an administrator and run the following commands:

```powershell
New-NetFirewallRule -DisplayName "SQL Server" -Direction "Inbound" -Protocol "TCP" -LocalPort "1433" -Action "Allow"
New-NetFirewallRule -DisplayName "SQL Server" -Direction "Inbound" -Protocol "UDP" -LocalPort "1434" -Action "Allow"
New-NetFirewallRule -DisplayName "SQL Server" -Direction "Inbound" -Program "%ProgramFiles%\Microsoft SQL Server\MSSQL12.LOCAL\MSSQL\Binn\sqlservr.exe" -Action "Allow"
```

## Enabling TCP/IP

Open SQL Server Configuration Manager and navigate to **SQL Server Network Configuration > Protocols for [YourInstanceName]**. Double-click on **TCP/IP** and select **Enable**, **Apply**, and **OK**.

![TCP/IP](assets/tcp.png){: style="width:75%;"}

You need to restart the SQL Server service for the changes to take effect. You can do this in SQL Server Configuration Manager by going to **SQL Server Services**, right-clicking on your SQL Server instance, and selecting **Restart**.

![Restart](assets/restart.png){: style="width:75%;"}

## Installing SQL Race Database

You can find the latest version of SQL Race Database on the [Portal](https://portal.mclarenapplied.com/portal/Downloads/Software#SQL%20Race%20Database).

Download and run the installer, accepting the license agreement. The installer should automatically detect your SQL Server instance. If it doesn't, you can manually enter the instance name you specified during installation (e.g. `SERVER_NAME\INSTANCE_NAME`).

![SQL Race](assets/sqlrace.png){: style="width:75%;"}

Leave all default options and click **Install**. 

### Setting Filestream

SQL Race doesn't use native filestreams, so you must create your own directory. Create a new folder on your C: drive called `SQLRace_FileStream`. When connecting to SQL Race Database from a remote machine, you'll need to access the folder you just created. Right click on the folder, go to **Properties > Sharing > Advanced Sharing**, check **Share this folder**, and click **Permissions**. Ensure that the user you are connecting with has at least **Read/Write** permissions. 

![FileStream Permissions](assets/permissions.png){: style="width:50%;"}

The folder will be available on the network at `\\YOUR_COMPUTER_NAME\SQLRace_FileStream`.

![Manual Filestream](assets/manual_filestream.png){: style="width:50%;"}

!!! note
    If the user accessing the filestream is in a different AD group then follow the steps [here](#cross-domain-access) to enable cross domain access.

## Connecting to SQL Race Database from ATLAS

In ATLAS, go to **Tools > Database Connection Manager** and Click **Add**. 

![ATLAS](assets/atlas.png){: style="width:75%;"}

!!! note
    It's preferrable to match the case of the host machine. So if the machine name is all caps, use all caps in the connection string.

Click **Test Connection** to make sure the filestream is writeable. 

!!! failure
    If your filestream is readonly, you will see the message "You are able to access only data to read." In this case, make sure you have read/write access to the folder. 

!!! success
    If the connection is successful, you should receive the message "Established connection to database successfully. FIle stream folder is writeable."

### Cross Domain Access

It is also possible to access SQL Race from a client machine in a different AD group.

#### Windows Credentials
From **Credentials manager > Windows credentials > Add a Windows Credential**

![ATLAS](assets/credential_manager.png){: style="width:100%;"}

When asked for an Internet or network address, you need to provide the IP or fully-qualified domain name (FQDM), followed by port 1433. Then give a valid username and password for the REMOTE server, ensure the user have permission to view the databases and access the filestreams. 

#### SQL Server Settings
In SSMS, right click the **Server instance > Properties > Connections > Allow remote connections to this server**

![ATLAS](assets/ms_ssms.png){: style="width:100%;"}

In **Sql Server configuration manager > SQL Native Client 11.0 Configuration**. Ensure TCP/IP is enable and move it to order 2.

![ATLAS](assets/sscm_tcp.png){: style="width:100%;"}

In **Sql Server configuration manager > SQL Server Network Configuration > Protocols for {instance name}** (for a default instance, the instance name would be MSSQLSERVER). Ensure TCP/IP is enabled.

![ATLAS](assets/sscm_tcp2.png){: style="width:100%;"}

Right click **TCP/IP > Properties**. Make all TCP Dynamic Ports blank and TPC Port to be 1433

![ATLAS](assets/tcp_left.png){: style="width:60%;"}
![ATLAS](assets/tcp_right.png){: style="width:60%;"}

Apply all setting and restart the service. 

On the server, run command ```netstat -a -p``` tcp and make sure port 1433 is listening. 

#### Test Remote Connection with SSMS

On your local machine, launch SSMS and use the following connection string: **{IP/ FQDM},1433**. For example: 10.1.123.123,1433 or 10.1.123.123,1433\MSSQLSERVER

![ATLAS](assets/connect_server.png){: style="width:100%;"}

Use Windows Authentication as the authentication method, the Windows Credential that we have set up earlier means that when you connect to the remote it will use that credential instead. 

!!! tip
    If you encounter this error message:

    ![ATLAS](assets/connect_server_error.png){: style="width:100%;"}

     That means your local machine cannot connect to the remote server. Ensure that remote connect is enabled and the protocols and port numbers are set correctly as outlined above. 

!!! tip
    If you encounter this error message:

    ![ATLAS](assets/connect_server_error2.png){: style="width:100%;"}

    Check your Windows Credential, this could be because the local credentials were passed, or because the username didn't include the domain prefix or used the wrong domain name. Double check all of the properties of the stored credential and recreate it if you need to (you can modify the username and password, but if the server name is wrong, you'll need to re-create it).

#### Enter connection details in ATLAS

The setting below might be required when using .NET Framework connecting to a SQL server in a MultiSubnet Environment. Follow the [link](https://techcommunity.microsoft.com/blog/sqlserversupport/connection-timeout-issue-with-net-framework-4-6-1---transparentnetworkipresoluti/318791) for more info. 

```TransparentNetworkIPResolution = False```

To connect to this database, navigate to the Connection Manager in ATLAS as normal, and enter **{server IP}\{instance name},1433**

The server’s name will not be present in the dropdown. But after entering the server name and let ATLAS connect to the database, the database name should be populated with all the available databases. 

![ATLAS](assets/a10connection_manager.png){: style="width:100%;"}

This should also create a corresponding entry in the the ```C:\Users\...\Documents\McLaren Electronic Systems\SQL Race Server\Config\ConnectionManagerV3.config``` file.

#### Using the SQLRace API

To read and write to databases cross domain, an entry would be required for the corresponding database in ConnectionManagerV3. Refer to the last section for the correct format.  

In the code, the connection string to be used for the SessionManager should be:

```
const string ConnectionString = @"Data Source=tcp:10.1.162.152\LOCAL,1433; TransparentNetworkIPResolution = False; Initial Catalog=SQLRACE02_155;Integrated Security=True;";
```

#### Access to the filestream

Depending on the SQL Race filestream is access controlled, you may have to follow similiar steps to allow access to the filestream folder using a different domained account.
