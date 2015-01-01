*
 *  Riviera Premier League
 *  Copyright (C) 2014  IEEE Computer Society - VIT Student Chapter <ieeecs@vit.ac.in>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var mongo_users = require('../db/mongo-users');
var express = require('express');
// var validator = require('validator');
var router = express.Router();
var mongo_players = require('../db/mongo-players');
var mongo_squad = require('../mongoSquad');
var mongo_team = require('../db/mongo-team');
var mongo_interest = require('../db/mongo-interest');
// var email_dispatch = require('emailjs'); Implement this later, when the view for forgot password is also present


router.get('/reset', function (req, res)
{
    if (req.cookies.name)
    {
        res.redirect('/home');
    }
    else
    {
        res.render('reset', { });
    }
});

router.get('/squad', function (req, res) // page to view the 16 player squad of a particular user
{
    if (req.cookies.name)                           // if cookies exists then access the database
    {
        var teamName = req.cookies.name;
        teamName = "test";
        var credentials =                           // creating a temporary variable to store cookies
        {
            '_id': teamName                             //  because kashish bhaya told to use '_id' only
        };

        var getSquad = function (err, documents)
        {
            if (err)
            {
                res.redirect('/home');
            }
            else
            {
                res.render('/squad', {Squad: documents});
            }

        };
        mongo_squad.fetchSquad(credentials, getSquad);
    }
    else
    {                                                  // if cookies does not exists then it will go to login page
        res.render('/login', { });
    }
});

router.get('/team', function (req, res) // view the assigned playing 11 with options to change the playing 11
{
    if (req.signedCookies.name)                           // if cookies exists then access the database
    {
        var teamName = req.signedCookies.name;

        var credentials =
        {
            '_id': teamName
        };

        var getTeam = function (err, documents)
        {
            if (err)
            {
                res.redirect('/home');
            }
            else
            {
                res.render('team', {Team: documents});
            }

        };
        mongo_team.getTeam(credentials, getTeam);
    }
    else                                                        // if cookies does not exists , go to login page
    {
        res.render('/login', { });
    }
});

router.get('/matchday', function (req, res) // page to view next match schedule and the opponent team
{
    res.render('matchday', { });
});


router.get('/forum', function (req, res) // User Forums
{
    res.render('forum', { });
});

router.get('/reset', function (req, res) // interest form
{
    res.render('reset', { });
});

module.exports = router;