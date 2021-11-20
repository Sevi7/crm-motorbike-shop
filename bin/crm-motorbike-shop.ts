#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import CrmMotorbikeShopStack from '../lib/crm-motorbike-shop-stack';

const app = new App();

new CrmMotorbikeShopStack(app, 'crm-motorbike-shop', {});
