# eslint setup

Tutorial of how to enable eslint code style for your electron/node project

## Install eslint globally

```
npm install eslint -g
```

## Setup an eslint style file

```
eslint --init
```

Then select the style you want to use (I recommend the `popular style guide` `standard` code style) and save it as json.

## Why should I do this

If you have setup eslint and you open your project directory in an editor like [Visual Studio Code](https://code.visualstudio.com/) and install the extension named eslint (`Ctrl` + `x`, then search for `eslint`) it autoamtically and live highlights the parts of your code that does not comply with the chosen JavaScript guidelines.

In return if your code will therfore become more uniform and thus clearer and easier to read and understand which is especially a good thing for open source code or group projects.

Also if somebody edits the code and you use a version control system like git and he can now probably automatically format his code, because he probably uses a clever editor that looks for eslint files and therfore there no thousand changes in the aftermath.

## Badge for README

You can also add now a badge to your repository to show visitors that are interested which code style you are using (people that are looking for this will also then with a higher chance use this code style for commits/pull requests and everybody is more happy than before :).

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

```markdown
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
```
