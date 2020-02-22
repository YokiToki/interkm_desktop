# InterKM
### Desktop client application for read/write rw1990 keys
[![Electron](https://user-images.githubusercontent.com/1845813/75061623-adfd0000-5513-11ea-914a-e9c6ba83405b.png)](https://www.electronjs.org/)
[![React](https://user-images.githubusercontent.com/1845813/41495585-3cf32294-7154-11e8-8039-a474aea40af4.png)](https://reactjs.org/)
[![Webpack](https://user-images.githubusercontent.com/1845813/41495593-5f397b64-7154-11e8-8e81-32aa44ee4395.png)](https://webpack.github.io/)
[![Yarn](https://user-images.githubusercontent.com/1845813/41504556-065d99ac-721d-11e8-814a-0c7c22ae19b1.png)](https://yarnpkg.com/)
## Install

Clone the repo via git:

```
$ git clone git@github.com:YokiToki/interkm_desktop.git
```

Install dependencies:

```
$ cd interkm_desktop
$ yarn
```

For building on Windows you need install build tools.
As Administrator run:

```
> npm i -g --production windows-build-tools
```

And set environment variable:

```
> set VCTargetsPath=C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\V140
```

Maybe you need download [Build Tools for Visual Studio](https://download.visualstudio.microsoft.com/download/pr/11503713/e64d79b40219aea618ce2fe10ebd5f0d/vs_BuildTools.exe)

## Run

Start the app in the `dev` environment:

```
$ npm start
```

## Building

To build apps (tar.gz, deb) for the linux:

```
$ npm run build-linux
```

Windows portable:

```
> npm run build-windows
```