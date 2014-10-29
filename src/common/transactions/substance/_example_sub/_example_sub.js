'use strict';

var _ = require('lodash');

module.exports = function [example]_[job] (options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:          '[example]'
  },options);

  // set role name
  var role = options.role;


  // set actions for plugin
  seneca.add({
    role: role,
    cmd: '[command_name]',
    [prop_one]: {type:'string$'}, // rules see parambulator
    [prop_two]: {type:'string$'}
  }, cmd_[command_name] )


  // provide logic for actions
  function cmd_[command_name] (args, done) {


    done(null,{ok:true,msg:msg })

  }



  return {
    name:role
  }

}
