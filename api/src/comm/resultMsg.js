/*
* 결과 코드에 대한 메세지
*/
module.exports = (() => ({
	0: 'Success',
	'-10': 'Not Exist workspaceid : workspaceid 부재',
	'-11': 'Not Exist User Key : user key 부재 ',


	'-30': 'Fail connect Redis system',
	'-31': 'Fail Get Redis History',

	'-52': 'SOE 장애 발생',

	'-91': 'Not Exist Callid : call id 부재',

	'OE.1103': '토큰이 존재하지 않습니다. 토큰을 입력해주세요',

	// 신규 20.06.08 추가
	'AP.1101': { resultCode: 'E', err_code: 'AP.1101', err_msg: '필수 항목의 값이 없습니다. 관리자에게 문의 바랍니다.' }, // empty Required field
	'AP.1102': { resultCode: 'E', err_code: 'AP.1102', err_msg: '해당 음성봇ID가 존재합니다. 관리자에게 문의바랍니다.' }, // Not validate Session
	'AP.1103': { resultCode: 'E', err_code: 'AP.1103', err_msg: '해당 음성봇ID가 존재하지 않습니다. 관리자에게 문의바랍니다.' }, // No Exist Session

	'AP.9001': { resultCode: 'E', err_code: 'AP.9001', err_msg: '몽고 쿼리 실행하는데 에러가 발생하였습니다. SOE 관리자에게 문의 바랍니다.' }, // // OE.9001.Execute mongo query, but fail execution
	'AP.9101': { resultCode: 'E', err_code: 'AP.9101', err_msg: '레디스 쿼리 실행하는데 에러가 발생하였습니다. SOE 관리자에게 문의 바랍니다.' }, // // OE.9101.Execute redis query, but fail execution
	'AP.9201': { resultCode: 'E', err_code: 'AP.9201', err_msg: '마리아 쿼리 실행하는데 에러가 발생하였습니다. SOE 관리자에게 문의 바랍니다.' }, // // OE.9101.Execute redis query, but fail execution
}))();
