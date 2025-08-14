"use strict";

const AccessService = require('../service/access.service')
const {CREATED, SuccessResponse} = require("../core/success.response");

class AccessController {
    signUp = async (req, res, next) => {
        // console.log(`[P]::signUp::`, req.body);
        new CREATED({
            message: 'registered',
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10
            }
        }).send((res))
    }

    login = async (req, res, next) => {
        // console.log(`[P]::login::`, req.body);
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send((res))
    }

    logout = async (req, res, next) => {
        // console.log(`[P]::logout::`, req.keyStore);
        new SuccessResponse({
            message: "Logout success!",
            metadata: await AccessService.logout(req.keyStore.id)
        }).send((res))
    }

    handlerRefreshToken = async (req, res, next) => {
        console.log('start - controller - handlerRefreshToken')
        new SuccessResponse({
            message: "Get token success!",
            metadata: await AccessService.handlerRefreshTokenV2({
                refreshToken: req.refreshToken,
                user: req.user,
                keyStore: req.keyStore
            })
        }).send((res))

    }
    

    Admin = async (req, res) => {
        try {
            res.json({
                message: 'Accept access',
                status: 200
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred',
                status: 500
            });
        }
    };
    
}

module.exports = new AccessController()