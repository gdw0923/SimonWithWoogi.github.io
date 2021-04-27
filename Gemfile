<<<<<<< HEAD
source "https://rubygems.org"

gem "jekyll", ">=3.8.6"

# Official Plugins
group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-redirect-from"
  gem "jekyll-seo-tag", "~> 2.6.1"
  gem 'tzinfo'
  gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
end

group :test do
  gem "html-proofer"
end
=======
# frozen_string_literal: true

source "https://rubygems.org"

gemspec

group :test do
  gem "html-proofer", "~> 3.18"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

gem "webrick", "~> 1.7"
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
