#!/usr/bin/python
__version__ = "0.1"
__author__ = "von Affenfels GmbH"

import sys, argparse, logging, logging.handlers, asyncore

logger = logging.getLogger('soccerbowl')

class SoccerBowl(argparse.ArgumentParser):
    def __init__(self, *args, **kwargs):
        super(SoccerBowl, self).__init__(*args, **kwargs)

        self.add_argument("-d", "--debug", action = "store_true", help = "Enables debug output")
        self.add_argument("--syslog", action = "store_true", help = "Enables logging to syslog")
        
        self.args = {}

    def process(self):
        self.args = vars(self.parse_args())

        if self.args["syslog"]:
            syslog = logging.handlers.SysLogHandler(address = '/dev/log', facility = logging.handlers.SysLogHandler.LOG_DAEMON);
            syslog.setFormatter(logging.Formatter("soccerbowl: [%(levelname)s] %(message)s"))
            logger.addHandler(syslog)
        else:
            stdout = logging.StreamHandler()
            stdout.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))
            logger.addHandler(stdout)

        if self.args["debug"]:
            logger.setLevel(logging.DEBUG)
        else:
            logger.setLevel(logging.INFO)

        logger.info("Started SoccerBowl v%s" % __version__)

        try:
            # Start loop
            asyncore.loop()
        except KeyboardInterrupt:
            print "Exiting\n"
            sys.exit(0)

        return True

# Main function
if __name__ == "__main__":
    parser = SoccerBowl()
    if (not parser.process()):
        parser.print_help()