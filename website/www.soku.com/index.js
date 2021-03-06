var _ = require('underscore'),
    Promise = require('bluebird'),
    request = require('request'),
    cheerio = require('cheerio');


module.exports = function (url) {
    var grabUrls = [];
    var videoInfo = {};

    return new Promise(function(resolve, reject){
        request(url, function (err, res, body) {
            if (err || !res || !body) {
                reject(err);
                return ;
            }

            //cheerio解析页面源码
            $ = cheerio.load(body); 

            try{
                //视频url
                for (var i = 0; i < $('.sk_result .v .v-link a').length; i++) {
                    grabUrls.push($('.sk_result .v .v-link a').eq(i).attr('href'));
                }

                //翻页url
                for (var i = 0; i < $('.sk_pager a').length; i++) {
                    grabUrls.push('http://www.soku.com' + $('.sk_pager a').eq(i).attr('href'));
                }

                var data = {
                    grabUrls: grabUrls,
                    videoInfo: videoInfo
                }

                resolve(data);
            }
            catch(err){
                console.log(err);
            }
        });
    })
};