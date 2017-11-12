const text = `Usage: differo [OPTION]... [URL]
      --help                 display this help and exit.
      --url <url>            the URL to be loaded.
      --browser-host <host>  browser's instance hostname.
      --browser-port <port>  browser's remote debugging port.
      --workdir <dir>        all screenshots and diff will be saved here.
      --prefix <string>      prefix of all generated images. If a leading / is
                             present, the path will override the workdir.
      --suffix <string>      suffix (before file type) of all generated images.
      --rebase               set screenshot as base
`;

module.exports = { text };
