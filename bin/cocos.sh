#!/bin/sh -e
# lets check if we have the submodules initialized

DIR=`dirname $0`

case `uname -a` in
Linux*x86_64*)
    "$DIR/../support/node-builds/lin64/node" "$DIR/cocos.js" "$@" 
	;;

Linux*i686*)
	"$DIR/../support/node-builds/lin32/node" "$DIR/cocos.js" "$@"
	;;
    
Darwin*)
    "$DIR/../support/node-builds/osx64/node" "$DIR/cocos.js" "$@"
    ;;

CYGWIN*)
    "$DIR/../support/node-builds/win32/node.exe" "$DIR/cocos.js" "$@"
    ;;

MING*)
    "$DIR/../support/node-builds/win32/node.exe" "$DIR/cocos.js" "$@"
    ;;    

*) echo "Unknown OS"
   ;;
esac



