#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import CrmMotorbikeShopStack from '../lib/crm-motorbike-shop-stack';
import { BuildConfig } from './config/BuildConfig';
import getConfig from './config/get-build-config';

const app = new App();

const buildConfigTest: BuildConfig = getConfig(app, 'test');

new CrmMotorbikeShopStack(app, 'crm-motorbike-shop', {}, buildConfigTest);
