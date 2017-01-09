const GENERAL = 0;
const WEAPONSKILL = 1;
const BALLISTICSKILL = 2;
const STRENGTH = 3;
const TOUGHNESS = 4;
const AGILITY = 5;
const INTELLIGENCE = 6;
const PERCEPTION = 7;
const WILLPOWER = 8;
const FELLOWSHIP = 9;
const OFFENCE = 10;
const DEFENCE = 11;
const FINESSE = 12;
const KNOWLEDGE = 13;
const FIELDCRAFT = 14;
const PSYKER = 15;
const SOCIAL = 16;
const TECH = 17;
const LEADERSHIP = 18;

const TALENT_TIER1 = 1;
const TALENT_TIER2 = 2;
const TALENT_TIER3 = 3;

const COLUMN_PSY_NAME = 0;
const COLUMN_PSY_DISCIPLINE = 1;
const COLUMN_PSY_VALEUR = 2;
const COLUMN_PSY_ACTION = 3;
const COLUMN_PSY_DISTANCE = 4;
const COLUMN_PSY_SOUSTYPE = 5;
const COLUMN_PSY_MAINTENU = 6;
const COLUMN_PSY_DESCRIPTION = 7;

function returnAptitudeText(aptitudeId){
	var returnValue = "";
	switch(aptitudeId)
	{
		case GENERAL: returnValue = "GENERAL";
		break;
		case WEAPONSKILL: returnValue = "WEAPONSKILL";
		break;
		case BALLISTICSKILL: returnValue = "BALLISTICSKILL";
		break;
		case TOUGHNESS: returnValue = "TOUGHNESS";
		break;
		case AGILITY: returnValue = "AGILITY";
		break;
		case STRENGTH: returnValue = "STRENGTH";
		break;
		case INTELLIGENCE: returnValue = "INTELLIGENCE";
		break;
		case PERCEPTION: returnValue = "PERCEPTION";
		break;
		case WILLPOWER: returnValue = "WILLPOWER";
		break;
		case FELLOWSHIP: returnValue = "FELLOWSHIP";
		break;
		case OFFENCE: returnValue = "OFFENCE";
		break;
		case DEFENCE: returnValue = "DEFENCE";
		break;
		case FINESSE: returnValue = "FINESSE";
		break;
		case KNOWLEDGE: returnValue = "KNOWLEDGE";
		break;
		case FIELDCRAFT: returnValue = "FIELDCRAFT";
		break;
		case PSYKER: returnValue = "PSYKER";
		break;
		case SOCIAL: returnValue = "SOCIAL";
		break;
		case TECH: returnValue = "TECH";
		break;
		case LEADERSHIP: returnValue = "LEADERSHIP";
		break;
	}
	return returnValue.toLowerCase();
}

function getPsychiquePower(){
	 $.ajax( {
            type: "GET",
			async: false,
            url: "./dh_files/pouvoir_psy.xml",
            dataType: "xml",
            success: function(xml) 
                     {
						// Setup - add a text input to each footer cell
						/*$('#talentTab tfoot th').each( function () {
							var title = $(this).text();
							$(this).html( '<input type="text" placeholder="Search '+title+'" style="width:100%;" />' );
						} );*/
						var cptColumn = 0;
						$('#filtertab thead th').each( function () {
							if(cptColumn!=COLUMN_PSY_DISCIPLINE)
							{
								var title = $(this).text();
								$(this).html( '<input type="text" placeholder="Search '+title+'" style="width:100%;" />' );
							}
							cptColumn++;
						} );
						var listPsyPower = new Array();
						$(xml).find('pouvoir').each(function(){
							var newPsyPower = new Object();
							newPsyPower.nom = $(this).find('nom').text();
                            newPsyPower.discipline = $(this).find('discipline').text();
							newPsyPower.valeur = $(this).find('valeur').text();
							newPsyPower.Action = $(this).find('Action').text();
							newPsyPower.Range = $(this).find('Range').text();
							newPsyPower.Maintenu = $(this).find('Maintenu').text();
							newPsyPower.SousType = $(this).find('SousType').text();
                            $(this).find('desc').each(
								function()
								{
									newPsyPower.descEn = $(this).find('en').text();
									newPsyPower.descFR = $(this).find('fr').text();
								});
							listPsyPower.push(newPsyPower);
                          });
						  console.log(listPsyPower);
						  // DataTable
						  var table = $('#talentTab').DataTable( {						  
							"data":listPsyPower,
							"columns": [
											{ "title": "Nom", "data": "nom" },
											{ "title": "Discipline", "data": "discipline" },
											{ "title": "Valeur", "data": "valeur" },
											{ "title": "Action", "data": "Action" },
											{ "title": "Distance", "data": "Range" },
											{ "title": "Maintenu", "data": "Maintenu" },
											{ "title": "Description", "data": "descFR" }
										]
							} );
							// Apply the search
							var cpt = 0;
							table.columns().every( function () {
								var that = this;
						 
								/*$( 'input', this.footer() ).on( 'keyup change', function () {
									if ( that.search() !== this.value ) {
										that
											.search( this.value )
											.draw();
									}
								} );*/
								$( 'input', this.footer() ).on( 'keyup change', function () {
									if ( that.search() !== this.value ) {
										that
											.search( this.value )
											.draw();
									}
								} );
								if(cpt!=COLUMN_PSY_DISCIPLINE){
									$( 'input', $('#filtertab thead th')[cpt] ).on( 'keyup change', function () {
										if ( that.search() !== this.value ) {
												that
													.search( this.value )
													.draw();
											}
										} );
								}
								else{
									var column = that;
									var title = $(this).text();
									var select = $('<select><option value="">-- '+$(this.header()).text()+' --</option></select>')
										.appendTo( $('#filtertab thead th')[cpt] )
										.on( 'change', function () {
											var val = $.fn.dataTable.util.escapeRegex(
												$(this).val()
											);
					 
											column
												.search( val ? '^'+val+'$' : '', true, false )
												.draw();
										} );
					 
									column.data().unique().sort().each( function ( d, j ) {
										select.append( '<option value="'+d+'">'+d+'</option>' )
									} );
								}
								cpt++;
							} );
                      }
        });
}

function mapTalentArrayToTelentObject(){
	var pTalents_tier1_Array = talents_tier1_Array;
	var listTalent = new Array();
	for(var i=0; i<pTalents_tier1_Array.length; i++)
	{
		var currTalent = new Object();
		currTalent.id = i;
		currTalent.name = pTalents_tier1_Array[i][0];
		currTalent.tier = pTalents_tier1_Array[i][1];
		currTalent.prerequisites = pTalents_tier1_Array[i][2][0];
		currTalent.apt1 = pTalents_tier1_Array[i][3][0];
		currTalent.apt2 = pTalents_tier1_Array[i][3][1];
		currTalent.summary = pTalents_tier1_Array[i][4];
		currTalent.description = pTalents_tier1_Array[i][5];
		listTalent.push(currTalent);
	}
	var plop = JSON.stringify(listTalent);
	console.log(plop)
}

function mapSkillArrayToSkillObject(){
	var pSkillArray = skillArray;
	var listSkill = new Array();
	for(var i=0; i<pSkillArray.length; i++)
	{
		var currSkill = new Object();
		currSkill.id = i;
		currSkill.name = pSkillArray[i][0];
		currSkill.apt1 = pSkillArray[i][1];
		currSkill.apt2 = pSkillArray[i][2];
		currSkill.subSkill = new Array();
		switch(i){
			case 6: currSkill.subSkill = commonLoreArray;
			break;
			case 9: currSkill.subSkill = forbiddenLoreArray;
			break;
			case 13: currSkill.subSkill = linguisticsArray;
			break;
			case 16: currSkill.subSkill = navigateArray;
			break;
			case 17: currSkill.subSkill = operateArray;
			break;
			case 20: currSkill.subSkill = scholasticLoreArray;
			break;
			case 27: currSkill.subSkill = tradeArray;
			break;
		}
		listSkill.push(currSkill);
	}
	var plop = JSON.stringify(listSkill);
	console.log(plop)
}

function SortByName(a, b){
  var aName = a.name.toLowerCase();
  var bName = b.name.toLowerCase(); 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

