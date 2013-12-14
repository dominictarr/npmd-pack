# npmd-pack

Pack a directory into a tarball stream.

This code is mostly pulled out of npm and fstream-npm does most of the work.
The only departure from the way that npm does it is to always set the timestamps to 0.

This is important to security (and thus to distribution),
because it means it's possible to verify an installed package
by repacking it.
(although, this will unfortunately only be possible if packed with with npmd-pack)

## Example

``` js
var pack = require('npmd-pack')

pack(process.cwd(), {})
  .pipe(fs.createWriteStream('../tarball.tgz'))
```

`opts` are passed through to [tar](https://github.com/isaacs/node-tar)

## License

MIT
