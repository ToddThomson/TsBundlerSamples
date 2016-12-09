/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React = require( "react" );
import ReactDom = require( "react-dom" );

import { TodoApp } from './components/controller-view/TodoApp';

ReactDom.render(
    <TodoApp />,
     document.getElementById( 'todoapp' )
);