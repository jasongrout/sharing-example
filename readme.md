# Goal

A) Provider package registers itself as a top-level shared module, and also registers a specific submodule as a shared module import *that is deduplicated*
B) Consumer package does not bundle the provider, but can import both the provider base package and a specific submodule of provider, with deduplication.

Currently we have A), except that the `otherimport` is duplicated - once in the otherimport_js file, once in the index_js file, presumably once per shared entry point? We want these deduplicated.

