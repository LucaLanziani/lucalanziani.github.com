.PHONY: build

build: install-dep
	./scripts/gen_index_min.sh

install-dep:
	bower install
