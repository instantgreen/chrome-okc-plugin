// check to see if any database upgrades or localStorage cleanups are necessary
(function () {
	// create a database if there isn't one
	if (localStorage.okcp === undefined) {
		localStorage.okcp = JSON.stringify({
			dataModelVersion: '1.1.0',
			profileList: {},
			settings: {}
		});
	}

	var storage = JSON.parse(localStorage.okcp);
	storage.dataCleanupJobNumToReach = '1.1.35';

	if (storage.dataCleanupJobNum === storage.dataCleanupJobNumToReach) {
		return false;
	}

	var upgradeMessage = ['Data Cleanup Run:'];

	// confirm that proper keys exist
	storage.settings = storage.settings || {};
	storage.profileList = storage.profileList || {};

	// if backup isn't current, create a backup
	if (localStorage.okcpBackup_1_1_33 === undefined) {
		localStorage.okcpBackup_1_1_33 = localStorage.okcp;
		upgradeMessage.push('  * Created a database backup (version 1.1.33)');
	}

	// clean up deprecated keys
	var deprecatedKeys = ['okcpSettings','okcp_b130110','okcp_b130124'];
	for (var i = 0; i < deprecatedKeys.length; i++) {
		if (!!localStorage[deprecatedKeys[i]]) {
			localStorage.removeItem(deprecatedKeys[i]);
			upgradeMessage.push('  * Removed deprecated key ('+deprecatedKeys[i]+')');
		}
	}

	// upgrade data model from 1.x if needed
	if (storage.hiddenProfileList !== undefined) {
		var oldData = storage;
		var newData = {
			'dataModelVersion': '1.1.0',
			'profileList': {}
		};
		for (i=0; i < oldData.hiddenProfileList.length; i++) {
			newData.profileList[oldData.hiddenProfileList[i]] = {h:true};
		}
		localStorage.okcp = JSON.stringify(newData);
		upgradeMessage.push('  * Updated Data Model to Version 1.1.0');
	}

	storage.dataCleanupJobNum = storage.dataCleanupJobNumToReach;
	localStorage.okcp = JSON.stringify(storage);

	console.log(upgradeMessage.join('\n'));
})();

// default questions
localStorage.okcpDefaultQuestions = JSON.stringify({
	questionsVersionNum : "1.1.9",
	questionsList : [

	//===== poly =====
	{
		qid:"99709", //Do you consider yourself polyamorous?
		category: "poly",
		wrongAnswers:["No"]
	},
	{
		qid:"131794", //How do you feel about polyamory? (multiple relationships)
		category: "poly",
		wrongAnswers:["That's cheating, monogamy is the only way to go","I'm open to the concept, but its not for me"]
	},
	{
		qid:"52827", //Would you consider connecting with someone whose relationship status is 'seeing someone' or 'married'?
		category: "poly",
		answers:[],
		conclusiveAnswers:[],
		wrongAnswers:["No to both","Yes to 'married' only"]
	},
	{
		qid:"325", //Would you consider having an open relationship (i.e., one where you can see other people)?
		category: "poly",
		wrongAnswers:["No"]
	},
	{
		qid:"1128", //Would you date someone who was already in a committed relationship with someone else?
		category: "poly",
		wrongAnswers:["Yes, even in secret.","No, it's wrong.","No, but I don't think it's inherently wrong."]
	},
	{
		qid:"16371", //Someone in an open relationship asks you out on a date. You:
		category: "poly",
		wrongAnswers:["Refuse / Aren't interested in open relationships."]
	},
	{
		qid:"33107", //Would you consider being part of a commited polyamorous relationship - ie, three or more people but no sex outside the group?
		category: "poly",
		wrongAnswers:["I am commited to total monogamy"]
	},
	{
		qid:"41242", //Your significant other is traveling and has the opportunity to stay with a good friend that you know they find to be very attractive. What's your stance on the situation?
		category: "poly",
		wrongAnswers:["It would be totally unacceptable."]
	},
	{
		qid:"48278", //Would you consider dating someone who is already involved in an open or polyamorous relationship?
		category: "poly",
		wrongAnswers:["No."]
	},
	{
		qid:"423049", //If your partner told you they wanted to sleep with someone else, how would you react to that?
		category: "poly",
		wrongAnswers:["That would be a deal breaker."]
	},
	{
		qid:"1121", //Have you ever had multiple romantic partners during the same time period?
		category: "poly",
		wrongAnswers:["Yes, and I didn't tell at least one of them."]
	},
	{
		qid:"28742", //Is it okay for a married person to play around with someone with the permission of their spouse?
		category: "poly",
		wrongAnswers:["No"]
	},
	{
		qid:"18564", //Do you believe that it is possible to experience romantic love for more than one person at a time without loving one less because of your love for the other?
		category: "poly",
		wrongAnswers:["No"]
	},
	{
		qid:"47098", //Would you consider dating someone who likes to maintain more than one sexual partnership, but keeps these relationships separate from one another? In other words ... Multiple partners, but only one at a time.
		category: "poly",
		wrongAnswers:["No."]
	},
	{
		qid:"36", //Would you ever consider an open marriage? That means you can sleep with other people.
		category: "poly",
		wrongAnswers:["No"]
	},
	{
		qid:"44540", //If you were in a serious relationship, would you mind if your significant other maintained an active profile on OkCupid?
		category: "poly",
		wrongAnswers:["Yes - I would mind this."]
	},
	
	//===== posessive =====
	{
		qid:"1440", //Jealousy: healthy or unhealthy, in the context of a relationship?
		category: "posessive",
		wrongAnswers:["Unhealthy"]
	},
	{
		qid:"784", //Would you be okay with your significant other spending a lot of time with one of his/her exes (as a friend)?
		category: "posessive",
		wrongAnswers:["Yes"]
	},
	{
		qid:"31581", //Your significant other's ex is coming into town and he/she wants to go out to dinner with them alone. How do you react?
		category: "posessive",
		wrongAnswers:["Sure, no problem."]
	},
	
	//===== masochistic =====
	{
		qid:"30", //Would you like to receive pain during sex?
		category: "masochistic",
		wrongAnswers:["No"]
	},
	{
		qid:"28545", //When having sex, do you like to have your hair pulled?
		category: "masochistic",
		wrongAnswers:["No way.","Don't know / Not sure."]
	},
	
	//===== dominant =====
	{
		qid:"61733", //Would you be pleased if a partner expressed the desire to be sexually humiliated by you?
		category: "dominant",
		wrongAnswers:["No."]
		
	},
	//===== bondage =====
	{
		qid:"29", //Would you rather...
		category: "bondage",
		wrongAnswers:["avoid bondage all together","do the tying"]
	},
	{
		qid:"1134", //Do you have a desire (even if it's secret) to take part in sexual activities involving bondage?
		category: "bondage",
		wrongAnswers:["No","Absolutely not."]
	},
	
	//===== sex-positive =====
	
	{
		qid:"13", //Is a girl who's slept with 100 guys a bad person?
		category: "sexPositive",
		wrongAnswers:["Yes"]
	},
	{
		qid:"61903", //Would you be concerned if your partner still masturbated, even though you were sexually active together?
		category: "sexPositive",
		wrongAnswers:["Yes"] //maybe "Maybe / I don't know"
	},
	{
		qid:"20976", //You're in a new relationship and your partner admits that they have had 14 sexual partners. Does that sound like a lot to you?
		category: "sexPositive",
		wrongAnswers:["Yes, and it makes me uncomfortable."]
	},
	{
		qid:"1435", //Do you consider yourself sexually open minded?
		category: "sexPositive",
		wrongAnswers:["No"]
	},
	
	//===== kinky =====
	{
		qid:"18530", //Do you want your partner to be kinkier than you?
		category: "kinky",
		wrongAnswers:["No"]
	},
	{
		qid:"1028", //Is your ideal sex rough or gentle?
		category: "kinky",
		wrongAnswers:["Gentle","I'm a virgin"]
	},
	{
		qid:"72086", //If your partner needed lovemaking to always be gentle, would you be fine with this?
		category: "kinky",
		wrongAnswers:["Yes."]
	},
	{
		qid:"9628", //Biting?
		category: "kinky",
		wrongAnswers:["No"]
	},
	{
		qid:"1133", //Do you have rape fantasies?
		category: "kinky",
		wrongAnswers:["No"]
	},
	{
		qid:"30115", //Have you ever gotten, or would you ever get, a piercing below the belt?
		category: "kinky",
		wrongAnswers:["I wouldn't."]
	},
	{
		qid:"58812", //Would you consider roleplaying out a rape fantasy with partner who asked you to?
		category: "kinky",
		wrongAnswers:["No."]
	},
	
		//===== anal =====
	{
		qid:"1040", //Receiving anal sex?
		category: "anal",
		wrongAnswers:["I don't like it / I don't think I would like it"]
	},
	{
		qid:"18600", //People who like RECEIVING anal sex are...
		category: "anal",
		wrongAnswers:["Perverts","Beyond my comprehension"]
	},
	{
		qid:"64476", //Under the right circumstances, would you allow a partner to lick your anus?
		category: "anal",
		wrongAnswers:["No."]
	},
	
	//===== submissive =====
	{
		qid:"463", //In your ideal sexual encounter, do you take control, or do they?
		category: "submissive",
		wrongAnswers:["I take control"]
	},
	{
		qid:"60726", //If a trusted partner asked you to submit to them sexually, would you? Assume that this would involve letting them collar you, command you, and have control over you during sex.
		category: "submissive",
		wrongAnswers:["No."]
	},
	{
		qid:"38320", //Is it generally acceptable to you for a sex partner to initiate foreplay while you are sleeping?
		category: "submissive",
		wrongAnswers:["No."]
	},
	{
		qid:"83808", //Would you ever consider a relationship where you would take on an exclusive sexual role as master or slave?
		category: "submissive",
		wrongAnswers:["No","Yes, as the master only."]
	},
	{
		qid:"79635", //How would you feel if someone called you "good girl" or "good boy" during sex?
		category: "submissive",
		wrongAnswers:["Negative.","Indifferent."]
	},
	{
		qid:"11", //How does the idea of being slapped hard in the face during sex make you feel?
		category: "submissive",
		wrongAnswers:["Horrified","Indifferent"]
	},
	{
		qid:"84005", //As an adult, have you ever worn a leash and collar in public?
		category: "submissive",
		wrongAnswers:["No."]
	},
	{
		qid:"48347", //Do you think you could ever enjoy being humiliated as part of a sexual experience?
		category: "submissive",
		wrongAnswers:["No."]
	},
	
	//===== cuddling =====
	{
		qid:"48753", //Do you like to cuddle?
		category: "cuddling",
		wrongAnswers:["No.","Sometimes - It depends."]
	},
	{
		qid:"19378", //How are you most likely to show your partner you care?
		category: "cuddling",
		wrongAnswers:["Gifts: Buy them flowers, jewelery or a new gadget","Actions: Do something nice (like a date or errand)","Words: Tell them how much you appreciate them"]
	},
	{
		qid:"72318", //Would you consider inviting someone to bed with you for clearly-stated non-sexual purposes (e.g., cuddle and sleep only) on a first date?
		category: "cuddling",
		wrongAnswers:["No."]
	},
	{
		qid:"41850", //How important is it for you to make physical contact when showing affection for someone?
		category: "cuddling",
		wrongAnswers:["Not important.","Somewhat important."]
	},
	
		//===== noDrugs =====
	{
		qid:"501", //Have you smoked a cigarette in the last 6 months?
		category: "noDrugs",
		wrongAnswers:["Yes"]
	},
	{
		qid:"79", //What's your relationship with marijuana?
		category: "noDrugs",
		wrongAnswers:["I smoke regularly.","I smoke occasionally."]
	},
	{
		qid:"23954", //Do you ever feel the need to get really drunk?
		category: "noDrugs",
		wrongAnswers:["Often","Sometimes","Rarely"]
	},
	{
		qid:"82566", //Do you like coffee?
		category: "noDrugs",
		wrongAnswers:["Yes. I need it to function."]
	},
	{
		qid:"8155", //On average, which best describes how often you GET WICKED DRUNK?
		category: "noDrugs",
		wrongAnswers:["Once every month or three.","Weekly / Bi-Weekly","Twice a week or more"]
	},
	{
		qid:"62254", //If it were legal to do so where you live, would you smoke marijuana?
		category: "noDrugs",
		wrongAnswers:["Yes."]
	},
	{
		qid:"77", //How frequently do you drink alcohol?
		category: "noDrugs",
		wrongAnswers:["Sometimes","Very often"]
	},
	{
		qid:"38051", //How often do you gamble?
		category: "noDrugs",
		wrongAnswers:["Often.","Rarely."]
	},
	{
		qid:"84023", //Could you live the rest of your life without drinking alcohol?
		category: "noDrugs",
		wrongAnswers:["No."]
	},
	{
		qid:"80621", //How often do you smoke cigars?
		category: "noDrugs",
		wrongAnswers:["Frequently.","Occasionally."]
	},
	
	//===== science =====
	{
		qid:"612", //Should evolution and creationism be taught side-by-side in schools?
		category: "science",
		wrongAnswers:["No, evolution has no place in schools", "Yes, students should hear both sides"]
	},
	{
		qid:"15889", //Do you put more weight in science or faith?
		category: "science",
		wrongAnswers:["Faith","Equally in both"]
	},
	{
		qid:"126793", //How do you believe the universe most likely came into existence?
		category: "science",
		wrongAnswers:["God or gods created it within the last 10k years","God or gods created it a very long time ago"]
	},
	{
		qid:"409", //A "shooting star" is a star that...
		category: "science",
		wrongAnswers:["...burned out, and collapsed","...collided with Earth's atmosphere","...got sucked into a black hole"]
	},
	{
		qid:"258", //Did America really put a man on the moon?
		category: "science",
		wrongAnswers:["No"]
	},
	{
		qid:"178", //Which is bigger?
		category: "science",
		wrongAnswers:["The earth"]
	},
	{
		qid:"19898", //Do you enjoy finding out what makes things work the way they do?
		category: "science",
		wrongAnswers:["As long as it works, who cares why?"]
	},
	{
		qid:"301", //Are you annoyed by people who are super logical?
		category: "science",
		wrongAnswers:["Yes"]
	},
	{
		qid:"20408", //Do you believe in an energy field that surrounds us that we can manipulate through reiki, acupuncture, chakra balancing, yoga, or some other system?
		category: "science",
		wrongAnswers:["Yes, and I practice one/some of these.","Yes, but I don't practice any of these."]
	},

	//===== children =====
	{
		qid:"80041", //Are you looking for a partner to have children with?
		category: "children",
		wrongAnswers:["Yes"]
	},

	//===== unaggressive =====
	{
		qid:"55349", //Have you ever thrown an object in anger during an argument?
		category: "unaggressive",
		wrongAnswers:["Yes."]
	},
	{
		qid:"386", //If someone intentionally damaged your property, would you be more likely to call the police, or to fight them?
		category: "unaggressive",
		wrongAnswers:["Fight them"]
	},
	{
		qid:"6689", //Are you quietly angry a lot of the time?
		category: "unaggressive",
		wrongAnswers:["Yes"]
	},

	//===== fetish =====
	{
		qid:"67511", //Suppose you're dating someone who seems to have long-term potential. You discover that they want to urinate on you during sex. Would you consider staying with this person?
		category: "fetish",
		wrongAnswers:["No."]
	},
	{
		qid:"665", //Are you fetish-friendly?
		category: "fetish",
		wrongAnswers:["Ew!"]
	},
	/*
	{
		qid:"1401", //Have you ever had a sexual encounter with someone of the same sex?
		category: "fetish",
		wrongAnswers:["No, and I would never."]
	},*/

	//===== Non-religious =====
	{
		qid:"115", //Do animals have "souls" like humans do?
		category: "nonReligious",
		wrongAnswers:["Yes"]
	},
	{
		qid:"763", //Do you believe in karma?
		category: "nonReligious",
		wrongAnswers:["Yes"]
	},
	{
		qid:"156917", //Are you an Atheist?
		category: "nonReligious",
		wrongAnswers:["No"]
	},
	{
		qid:"210", //Do you believe in God?
		category: "nonReligious",
		wrongAnswers:["Yes"]
	},
	/*
	
	//===== BDSM =====
	{
		qid:"463", //In your ideal sexual encounter, do you take control, or do they?
		category: "bdsm",
		wrongAnswers:["I take control"]
	},
	{
		qid:"84005", //As an adult, have you ever worn a leash and collar in public?
		category: "bdsm",
		wrongAnswers:["No."]
	}*/
]});

/*

from TheOriginalRaconteur1 sent 4 hours ago
30392" Would you be comfortable marrying a bisexual person
37708" The idea of gay and lesbian couples having children is:


	{
		qid:"46563", //Assume you have a homosexual friend who is the same gender as you. Would it bother you if they hugged you?
		category: "",
		wrongAnswers:["Yes"] //maybe "Only if I thought the hug was more than friendly"
	},

	{
		qid:"55744", //If you were going to have a child, would you want the other parent to be of the same ethnicity as you?
		category: "racism",
		wrongAnswers:["Yes"] //maybe "No"
	},

	{
		qid:"29055", //How do you feel about living with a signficant other before marriage?
		category: "",
		wrongAnswers:["I'm against that."]
	},
	{
		qid:"358077", //Could you date someone who was really messy?
		category: "ADHD",
		wrongAnswers:["No"]
	},
	{
		qid:"57731", //Would you consider dating someone who is much kinkier than you are?
		category: "",
		wrongAnswers:["No."]
	},
	{
		qid:"65937", //Imagine that you come home to find a partner pouring red wine all over a stranger's naked body and then licking it off. Which, if any of the following, would bother you most?
		category: "",
		wrongAnswers:[""]
	},
	{
		qid:"212813", //Which best describes your political beliefs?
		category: "politics",
		wrongAnswers:[""]
	},
	{
		qid:"1153", //Sexually explicit art or song lyrics should be
		category: "",
		wrongAnswers:["Censored to protect society"]
	},

	{
		qid:"", //
		category: "",
		wrongAnswers:[""]
	},
	
*/
