const resultMsg = require('../../comm/resultMsg');
const logger = require('../../comm/logger');
const { parseReq } = require('../../comm/comm');
const { filter } = require('../../comm/arrayUtil');
const { getSession } = require('../../comm/session');

const router = require('express').Router();

const aiMesssage = async (req, res) => {
    let result = { output: '', action: { type: 'voice', fieldset: {} } };
    try {
        const reqParams = parseReq(req);
        const projectId = req.params;
        const { callid, params } = reqParams;
        let { input } = reqParams;
        
        logger.info(`API >> Message >> projectId >> `, projectId);

        /**
         * stemp 1
         * 필수 필드 값 체크
         */
        const emptyRequiredField = filter(['callid'], (item) => !reqParams[item]);
        if(emptyRequiredField.length> 0) {
            const errorCode = { ...resultMsg['AP.1101'], emptyRequiredField };
            logger.error(errorCode);
            return res.json(errorCode);
        }

        /**
         * step 2
         * api session 데이터 조회
         */
        const getSessionRst = await getSession(`api: ${callid}`);
        if(!getSessionRst) {
            const errorCode = { ...resultMsg['AP.1103'], callid };
            logger.error(errorCode);
            return res.json(errorCode);
        }
        const { userKey } = getSessionRst;

        /**
         * step 3
         * message 요청
         */
        const soeReqParams = { userKey, content: input };
        logger.info(`API >> Message >> soeReqParams >> `, soeReqParams);

        return res.json(result);

    } catch (error) {
        return res.status(500).json(result);
    }

};

router.post('/message/:projectId', aiMesssage);

module.exports = router;