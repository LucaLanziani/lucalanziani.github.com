.PHONY: build clean

build: install-dep
	./scripts/gen_index_min.sh

install-dep:
	bower install

clean:
	rm -rf bower_components
	rm js/libs.min.js
	rm css/libs.min.css
	rm index.html
