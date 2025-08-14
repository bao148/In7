'use strict'
const User = require("../models/user");
const {BadRequestError, AuthFailureError, ForbiddenError} = require("../core/error.response");
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("../service/keyToken.service")
const {createTokenPair} = require("../auth/auth.Utils");
class AccessService {

    static logout = async (keyStore) => {
        const delKey = await KeyTokenService.removeKeyById(keyStore)
        return delKey
    }

    static login = async ({email, password, refreshToken = null}) => {
        console.log("login:: email %s :: password %s :: refreshToken %s", email, password, refreshToken)
        //1.
        const foundShop = await User.findUserByEmail(email)
        console.log('User found:', foundShop); // In ra thông tin người dùng nếu tìm thấy
        // console.log("password:: %s, password_hash:: %s", password, foundShop.password)
        if (!foundShop) throw new BadRequestError('Shop not registered!')
        //2.
        const match = await bcrypt.compare(password, foundShop.password)

        if (!match) {
            throw new AuthFailureError('Authentication error')
        }

         // 2. Kiểm tra trạng thái tài khoản
            const userStatus = foundShop.status;
            if (userStatus !== 'active') {
                throw new BadRequestError('Your account is not active. Please contact the administrator.');
            }

        const userRole = foundShop.role;
        //3.
        // create privateKey, publicKey
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')
        //4. generate tokens
        const {id: userId} = foundShop

        const tokens = await createTokenPair({userId, email, userRole}, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            userId,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken,

        })
        return {
            shop: {
                "user_id": foundShop.id,
                "name": foundShop.fullname,
                "email": email,
                "role": foundShop.role,
            },
            tokens
        }
    }


    static handlerRefreshTokenV2 = async ({keyStore, user, refreshToken}) => {
        console.log('start -- service -- handlerRefreshTokenV2')
        // console.log("handlerRefreshTokenV2 ==== keyStore:: %s, user:: %s, refreshToken::%s", keyStore, user, refreshToken)
        const {userId, email} = user;
        if (keyStore.refresh_tokens_used.includes(refreshToken)) {
            await KeyTokenService.deleteKeyById(userId)
            throw new ForbiddenError('Something wrong happened !! Pls relogin')
        }
        if (keyStore.refresh_token !== refreshToken) throw new AuthFailureError('Shop not registered')
        //check userId
        const foundShop = await User.findUserByEmail(email)
        if (!foundShop) throw new AuthFailureError('Shop not registered 2')
        const userRole = foundShop.role;
        console.log("userRole::", userRole)
        // tao 1 cap moi
        const tokens = await createTokenPair({userId, email, userRole}, keyStore.public_key, keyStore.private_key)
        // cap nhat token
        await KeyTokenService.updateKeyToken(userId, tokens.refreshToken, refreshToken);
        return {
            user,
            tokens
        }
    }


    static signUp = async ({name, email, password}) => {
        // console.log("signUp:: name %s :: email %s :: password %s", name, email, password)
        const holderShop = await User.findUserByEmail(email);
        console.log('holderShop::', holderShop)
        if (holderShop) {
            throw new BadRequestError('Error Shop already registered!')
        }
        const passwordHash = await bcrypt.hash(password, 10)

        // Lưu người dùng mới
        const newShop = await User.save({
            FullName: name,
            Email: email,
            Password: passwordHash,
            PhoneNumber: "",
            Role: "user", // Có thể để mặc định là 'user'
            Status: "active" // Có thể để mặc định là 'active'
        });
        if (newShop) {
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            console.log({privateKey, publicKey}) //save collection KeyStore

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop,
                publicKey,
                privateKey
            })
            if (!keyStore) {
                throw new BadRequestError('KeyStore Error')
            }
            // create token pair
            const tokens = await createTokenPair({userId: newShop, email}, publicKey, privateKey)
            console.log(`Created Tokens Success::`, tokens)
            return {
                code: 201,
                user: {
                    "user_id": newShop,
                    "name": name,
                    "email": email
                },
                tokens
            }
        }

        return {
            code: 200,
            metadata: null
        }
    }
}


module.exports = AccessService