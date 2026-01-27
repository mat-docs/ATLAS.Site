!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.

# Service Connection Manager

The Service Connection Manager allows users with an RTA License to manage RTA hosts containing sessions in their indexed sources. This guide explains how to add, remove, edit, import, and export service connections.

## Opening the Service Connection Manager

1. Open the **Session Browser**.
2. Go to the **Indexed Sources** tab.
3. Click the **Add Data Source** button ( ).
4. Select **Service Connections**.

## Adding a Service Connection

1. Click the **Add** button.
2. Enter the following connection details:
    - **Friendly Name**: The name displayed in the Sources area of the Session Browser.
    - **URI**: The address of the RTA Session host.
3. If not using OAuth 2.0 Authorization:
    - Click **Test** to verify the connection.
    - If successful, click **OK** to save, or **Cancel** to discard.
    ![Service Connection Properties](assets/service-properties.png)
4. If using OAuth 2.0 Authorization:
    - Enable the OAuth 2.0 checkbox.
    - Fill in the required authentication fields.
    - Test the connection and click **OK** to save.

Once the connection is set up, enable the **Indexed source** checkbox to retrieve sessions from the host.

## Importing and Exporting Service Connections

- Use the **Import** and **Export** buttons in the Service Connection Properties to share connection files (`.svc`) with other users.

## Removing a Service Connection

1. Select the Service Connection to remove.
2. Click the **Remove** button.
3. Confirm by clicking **Yes**, or cancel by clicking **No**.

## Viewing and Editing Service Connection Properties

1. Select the Service Connection you want to view or edit.
2. Click the **Properties** button to access and modify the connection details.
