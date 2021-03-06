(function() {
  if (!this.require) {
    var modules = {}, cache = {};

    var require = function(name, root) {
      var path = expand(root, name), indexPath = expand(path, './index'), module, fn;
      module   = cache[path] || cache[indexPath];
      if (module) {
        return module;
      } else if (fn = modules[path] || modules[path = indexPath]) {
        module = {id: path, exports: {}};
        cache[path] = module.exports;
        fn(module.exports, function(name) {
          return require(name, dirname(path));
        }, module);
        return cache[path] = module.exports;
      } else {
        throw 'module ' + name + ' not found';
      }
    };

    var expand = function(root, name) {
      var results = [], parts, part;
      // If path is relative
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    };

    var dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };

    this.require = function(name) {
      return require(name, '');
    };

    this.require.define = function(bundle) {
      for (var key in bundle) {
        modules[key] = bundle[key];
      }
    };

    this.require.modules = modules;
    this.require.cache   = cache;
  }

  return this.require;
}).call(this);
this.require.define({"app/controllers/elements/image":function(exports, require, module){(function() {
  var Color, Element, Image,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Element = require('../element');

  Color = require('app/models/properties/color');

  Image = (function(_super) {

    __extends(Image, _super);

    Image.name = 'Image';

    Image.prototype.className = 'image';

    Image.prototype.id = module.id;

    function Image(attrs) {
      if (attrs == null) {
        attrs = {};
      }
      Image.__super__.constructor.apply(this, arguments);
      this.setSrc(attrs.src);
    }

    Image.prototype.setSrc = function(src) {
      this.src = src;
      if (this.src) {
        return this.set({
          backgroundColor: new Color.Transparent,
          backgroundImage: "url(" + this.src + ")",
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        });
      }
    };

    Image.prototype.toValue = function() {
      var result;
      result = Image.__super__.toValue.apply(this, arguments);
      result.src = this.src;
      return result;
    };

    return Image;

  })(Element);

  module.exports = Image;

}).call(this);
;}});
