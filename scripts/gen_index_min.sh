#!/bin/bash
DEV_INDEX=index_dev.html

echo > ./js/libs.min.js
for i in $(awk '/src.*bower.*js/ { match($0, /src=['\''"][^'\''"]+['\''"]/); print substr($0, RSTART+5,RLENGTH-6) }' $DEV_INDEX);
do (cat "${i}"; echo) >> ./js/libs.min.js
done

echo > css/libs.min.css
for i in $(awk '/href.*bower.*css/ { match($0, /href=['\''"][^'\''"]+['\''"]/); print substr($0, RSTART+6,RLENGTH-7) }' $DEV_INDEX);
do (cat "${i}"; echo) >> ./css/libs.min.css
done

sed -e '/^.*bower.*$/d' -e 's/<!--UNCOMMENTIFMIN\s\+\(.*\)-->/<\1>/g' $DEV_INDEX > index.html
