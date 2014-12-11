//var xhr = new XMLHttpRequest();
//var api_url = "http://ipinfo.io/?callback=";
//var user_country = "US";

var formatNumToDecimal = function (input)
{
	return parseFloat(Math.round(input * 100) / 100).toFixed(2);
}

var timeToArr = function (d)
{
	return [d.getHours(), d.getMinutes()];
}

var calcTargetTZ = function (userDate, userTZ)
{
	var target = 17; //we're looking for 5pm
    var userHour = parseInt(userDate[0]);
    if(userHour < 12)
    {
        userHour += 24;
        var offset = target - userHour;
    }
    else
    {
        var offset = target - parseInt(userDate[0]);
    }

	return parseInt(userTZ) + offset;
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * For future shizzle
 *
function pickRandomProperty(obj)
{
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

function retrieve_country()
{
    xhr.open("GET", api_url, false);
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4)
        {
            response = String(xhr.responseText);
            ip_info = JSON.parse(response);
            user_country = ip_info.country;
        }
    }

    var requestTimer = setTimeout(function()
    {
        xhr.abort();
    }, 1600);

    try {
        xhr.send(null);
    } catch(err) {
        return false;
    }
}
**/

function summertimeyeah()
{
    var ZomerTijd;                                      // Resultaat
    var Vandaag = new Date();                           // Hulpje, bevat de systeemdatum
    var mm_ = Vandaag.getMonth();                       // Maand. Januari = 0, Febr =1 1, .... december = 11
    if (mm_ <= 1 || mm_ >= 10 ) ZomerTijd = false;      // Jan, Feb, Nov, Dec.
    if (mm_ >= '3' && mm_ <= '8')  ZomerTijd = true;    // April t.m. september
    else {                                              // Maart of oktober
        var CheckDate, ww_, i;                            // Hulpjes
        var dd_ = Vandaag.getDate();                      // Datum en weekdag laatste zondag maart of oktober, hulpje
        if (mm_ == 2) {                                   // Maart
            if (dd_ < 25) ZomerTijd = false;                // Begin van de maand is wintertijd
            else {
                for (i=31; i>24; i--) {                            // Zoek laatste zondag van de maand, day == 0
                    CheckDate = new Date(Vandaag.getFullYear(),2,i);
                    if (CheckDate.getDay() == 0) { ww_ = i; break }  // Zondag gevonden
                }
                if (dd_ < ww_) Zomertijd = false; else ZomerTijd = true;  // vergelijk datum
            }
        }
        if (mm_ == 9) {                                     // Oktober
            if (dd_ < 25) ZomerTijd = true;                   // Begin van de maand is zomertijd
            else {
                for (i=31; i>24; i--) {                            // Zoek laatste zondag van de maand, day == 0
                    CheckDate = new Date(Vandaag.getFullYear(),9,i);
                    if (CheckDate.getDay() == 0) { ww_ = i; break }  // Zondag gevonden
                }
                if (dd_ >= ww_) Zomertijd = false; else ZomerTijd = true;  // vergelijk datum
            }
        }
    }
    return ZomerTijd;
}

$(document).ready(function()
{
    var timeNow = new Date();
	var currentTimeZoneOffsetInHours = timeNow.getTimezoneOffset() / -60; //negative sign so we get the right offset.
	var userTZ = formatNumToDecimal(currentTimeZoneOffsetInHours);
	var userTime = timeToArr(timeNow);
	var targetTZ = formatNumToDecimal(calcTargetTZ(userTime, userTZ));
	var countries;

    if(userTime[0] == 17)
    {
        $('#fiveyesno').html("Yes! It's 5 o'clock!");
        $('#fiveadditional').html("Have a nice evening!");
        $('#front-page-nav, .nav-wrapper').addClass("light-green darken-2");
    }
    else
    {
        $('#fiveyesno').html("Not on your watch!");

        if(summertimeyeah())
        {
            countries = dst_timezones[targetTZ];
        }
        else
        {
            countries = timezones[targetTZ];
        }

        if(countries)
        {
            $('#fiveadditional').html("But it's actually 5 o'clock in <br />"
                + countries[getRandomInt(0,countries.length-1)]);
        }
        else
        {
            $('#fiveadditional').html("Oh, snap! It's 5 o'clock nowhere!");
        }
    }

});