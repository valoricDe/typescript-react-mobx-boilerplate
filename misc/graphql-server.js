#!/usr/bin/env babel-node
/**
 * Created by velten on 18.10.16.
 */
import http from 'http'
import postgraphql from 'postgraphql'

import {graphql} from 'settings'
import {postgres} from 'settings'
const p = postgres;

http.createServer(postgraphql('postgres://'+p.user+':'+p.password+'@'+p.host+':'+p.port+'/'+p.db)).listen(graphql.port)

// TODO use koa
/*
 import express from 'express'
 import postgraphql from 'postgraphql'

 const app = express()

 app.use(postgraphql('postgres://localhost:5432'))

 app.listen(3000)
 */