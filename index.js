#! /usr/bin/env node

var Packer = require('fstream-npm')
var tar    = require('tar')
var zlib   = require('zlib')

var pack = module.exports = function (folder, opts) {
  var last

  var opts = opts || {}

  var offset = new Date().getTimezoneOffset() * -1
  var THE_BEGINNING_OF_TIME = new Date(offset)

  return new Packer({ path: folder, type: "Directory", isDirectory: true })
    .on("error", function (err) {
      err.message = err.message + ("\nError reading " + folder)
      return last.emit('error', err)
    })
    .on('entry', function (entry) {
      //set the timestamp to the same thing,
      //so that the shasum of the tarball is
      //determined only from the file contents.
      entry.props.mtime =
      entry.props.atime =
      entry.props.ctime =
        THE_BEGINNING_OF_TIME
    })

    .pipe(tar.Pack(opts))
    .on("error", function (er) {
      err.message = err.message + ("\nError creating tarball " + folder)
      return last.emit('error', err)
    })
    .pipe(last = zlib.Gzip())
}

if(!module.parent)
  pack(process.cwd()).pipe(process.stdout)
