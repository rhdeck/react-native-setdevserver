# react-native-setdevserver

React-Native plugin to set the IP/hostname of the development server to host the
RN JS and asset bundle.

# Usage

From the project directory:

```
yarn install react-native-setdevserver
react-native setdevserver 192.168.1.1
```

Where "192.168.1.1" is the IP address (usually) or hostname (more rarely) of the
machine you want to use for development

To undo the change, and go back to default behavior, where the current machine
is the development server, run the plugin without the server argument:

```
react-native setdevserver
```

Note that the devserver is saved in your package.json, for replicability.

**Note** this version only supports changing the development server in IOS. To
change in Android, use the developer menu like you would before.
