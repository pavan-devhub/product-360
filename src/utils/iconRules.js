// Picks a Lucide icon (by component name) for a Product 360 category or
// division from the words in its Telugu/English name. The data's own tags are
// too coarse (most are "GEN") and often wrong, so they are only a fallback.
//
// Rules are checked top to bottom and the first match wins, so specific
// phrases sit above broad ones (e.g. "cold storage" above "storage").
// Strings match anywhere in the lower-cased name; regexes allow word edges.
// Beware Telugu substrings: "స్థల" (site) also sits inside "వ్యవస్థలు"
// (systems), and "టెక్" inside "ఆర్కిటెక్చర్" (architecture).

const rule = (icon, ...match) => ({ icon, match });

const RULES = [
  { icon: 'Tractor', seg: 'FarmGate', match: ['యంత్రాలు', /\bchc\b/, /machin/] },

  // Specific phrases that would otherwise be caught by a broader rule below
  rule('ListTree', /11-group/, /scheduled-product/),
  rule('LockKeyhole', 'డేటా భద్రత'),
  rule('HeartHandshake', 'సామాజిక-భద్రత', /pmsby/, /welfare/),
  rule('Radiation', /irradiat/),
  rule('Cog', 'యంత్ర-లైన్'),
  rule('Landmark', /policy-making/, 'అమలు యంత్రాంగం'),
  rule('Factory', /food parks?\b/),
  rule('Wheat', /harvesting-window/, /cereal-processing/),
  rule('Sun', /dryer-type/),
  rule('Warehouse', /pack[- ]?house/, /wdra/),
  rule('Radar', /biosensor/),
  rule('Microscope', /rapid test/),
  rule('MessageSquareWarning', 'ఫిర్యాదు-పరిష్కార', /grievance/),
  rule('ClipboardList', /cluster-study/),
  rule('Presentation', 'వాణిజ్య కార్యక్రమ'),
  rule('Megaphone', /\b9ps\b/),
  rule('Leaf', 'వృక్షశాస్త్ర', /botan/),
  rule('ShoppingBasket', /procure/),

  rule('GraduationCap', /(?<!మ)శిక్షణ/, /train(ing|er)/, 'విద్యా', /\bdegree\b/, 'డిగ్రీ', /b\.tech|m\.tech|ph\.d/, /academic/, 'అకడమిక్', 'ప్రవేశ ప్రక్రియ', 'నైపుణ్య', /skill/, 'స్వీకరణ', 'కంటెంట్', /content-(development|package)/, /\bslti\b/),
  rule('QrCode', 'ట్రేసబిలిటీ', /traceab/, /\buic\b/, /rfid/, /blockchain/),
  rule('ShieldAlert', 'తిరస్కరణ', /rasff/, /reject/, /non-tariff/, 'అడ్డంకులు', /penalt/, /alert/),
  rule('Umbrella', 'బీమా', /insur/, /ecgc/),
  rule('BadgeCheck', /halal/, /globalgap/, /gfsi/, /\bgap\b/, /fsms/, /\basta\b/, 'ప్రవేశ ధృవీకరణ'),
  rule('TrainFront', /railway/),
  rule('Plane', 'వాయు', /airport/, 'విమానాశ్రయ', /\biata\b/, /\bawb\b/),
  rule('Snowflake', 'శీతల', /cold/, /freez/, /frozen/, /reefer/, /refrigerat/, /chill/, /\biqf\b/, /cryogen/, /cool/, 'ఫ్రీజింగ్'),
  rule('CalendarDays', 'క్యాలెండర్', /calendar/, 'కాలక్రమం', /timeline/),
  rule('Calculator', 'ఫార్ములా', /formula/, /costing/, 'గణన', /scoring/, /\birr\b/, /dscr/, /net-worth/, /evaluation-matrix/),
  rule('Package', 'ప్యాకేజింగ్', /packag/, 'ప్యాక్ సైజు', /filling/, /fill-seal/, /labell?ing/, 'లేబులింగ్', /active-map/),
  rule('Thermometer', 'వేడి', /temperat/, 'టెంపరేచర్'),
  rule('ScanBarcode', /\bhsn\b/, /\bhs[ -]?code/, 'hs కోడ్', /tariff/, /coding system/),
  rule('Stamp', 'కస్టమ్స్', /customs/, /shipping[- ]bill/, /self-sealing/, /\bseal\b/, /\bduty\b/, /\bcha\b/),
  rule('ShieldPlus', 'క్వారంటైన్', /quarantine/, 'ఫైటోసానిటరీ', /phytosanit/, 'మొక్కల ఆరోగ్య', /\bippc\b/, /\boie\b/, /animal health/),
  rule('FileText', 'పత్రాలు', 'పత్రాల', /document/, 'డాక్యుమెంటేషన్', /declaration/, 'ప్రకటన', /template/, 'మూస', /\bform-c\b/),
  rule('Globe', /\bwto\b/, /\bsps\b/, /\btbt\b/, /\bfta\b/, /\bcodex(?!-)/),
  rule('Handshake', 'ఒప్పంద', /agreement/, /contract/, /incoterm/, 'ద్వైపాక్షిక', /bilateral/, /\bg2g\b/),
  rule('Container', /\bcontainer\b(?!-cargo)/),
  rule('Ship', 'పోర్ట్', /\bport\b/, /\bsea\b/, /sea-protocol/, /charter/, /cargo/, /\bicd\b/, /\bcfs\b/),
  rule('Route', 'కారిడార్', /corridor/),
  rule('Truck', 'రవాణా', /transport/, 'లాజిస్టిక్స్', /logistic/, /freight/, /forwarder/, /multi-modal/),
  rule('Hourglass', 'షెల్ఫ్ లైఫ్', /shelf/),
  rule('SprayCan', 'స్ప్రే'),
  rule('Warehouse', 'నిల్వ', /storage/, /warehous/, 'గిడ్డంగి', 'గోడౌన్', 'ధూమీకరణ', /inventory/),
  rule('FlaskConical', /\bmrl\b/, /residue/, 'అవశేష', 'రసాయన', /chemical/, 'పురుగుమందు', /pesticid/, /toxin/, /phrt/, /preservativ/, 'ప్రిజర్వేటివ్', /additive/, /ingredient/, 'ఇంగ్రీడియంట్', /enzyme/, /ferment/, /probiotic/, /nutraceut/, /oleoresin/, 'జీవరసాయన', /biochem/),
  rule('Bug', 'పురుగు', 'వ్యాధి', 'నులిపురుగు', /\bipm\b/, /\bpests?\b/, 'వన్యప్రాణ', 'పంట రక్షణ'),
  rule('Milk', /\bmilk\b/),
  rule('Egg', /\begg/),
  rule('Fish', /fish/, /seafood/),
  rule('Beef', 'మాంసం', /\bmeat\b/, /slaughter/),
  rule('PawPrint', 'పశు', 'జంతు', /livestock/, /animal/),
  rule('Microscope', 'పరీక్ష', 'టెస్ట్', /\btests?\b/, /testing/, 'ల్యాబ్', 'లాబ్', /\blab\b/, 'ప్రయోగశాల', 'సూక్ష్మజీవ', /microb/, /pathogen/, /sampling/, /radiograph/),
  rule('Lightbulb', 'పరిశోధన', /research/, /r&d/, /innovat/),
  rule('BookOpen', 'నిర్వచన', /definition/, 'పరిధి', /terminolog/, /fundamental/, /concepts/),
  rule('Banknote', 'ఆర్థిక', /financ/, 'ఫైనాన్స్', 'రుణ', 'ఋణ', /\bloan/, /credit/, /\bbank/, 'బ్యాంక్', 'తనఖా', /pledge/, /escrow/, /capital/, /venture/, /accounting/, 'అకౌంటింగ్', /\bfund(s|ing)?\b/, 'ఫండ్', /invest/, 'పెట్టుబడి', /\bfema\b/, /payment/, /\bnbfc\b/, /\bnwr\b/, /receipt/, /budget/, /\bnaif\b/, /\brtgs\b/),
  rule('ScanSearch', 'కల్తీ', /adulterat/, /detection/, /inspection/, /due-diligence/, /screening/, /audit/, 'గుర్తింపు', /identif/),
  rule('Percent', 'నిష్పత్తి', /\bratio\b/),
  rule('TriangleAlert', 'ప్రమాద', /\brisk/, 'రిస్క్', 'సంక్షోభ', /crisis/, /hazard/),
  rule('ShieldCheck', /food safety/, /haccp/, /\bccp\b/, /\bprp\b/, /\bgmp\b/, /\bghp\b/, /\bglp\b/, 'భద్రత', /hygien/),
  rule('ListTree', /\bpli scheme segment/),
  rule('HandCoins', 'పథక', /scheme/, 'సబ్సిడీ', /subsid/, 'ప్రోత్సాహక', /incentive/, /\bpli\b/, /grant/, /rodtep/, /\btma\b/, /convergence/, 'కన్వర్జెన్స్', /operation greens/),
  rule('Tag', 'ధర', /\bprices?\b/, /pricing/, /landed/),
  rule('TrendingUp', 'లాభదాయక', /profitab/, 'పెరుగుదల', /growth/),
  rule('IndianRupee', 'ఖర్చు', /\bcost/, 'వ్యయ', 'లాభ', /profit/, /economic/, 'ఆదాయ', /income/, /revenue/),
  rule('Leaf', /carbon/, 'కర్బన', /\besg\b/, 'నిలకడ', 'స్థిరత్వ', /sustainab/, /regenerat/),
  rule('CloudSun', 'వాతావరణ', /climate/, /weather/),
  rule('ChartColumn', 'కొలమాన', /metric/, /benchmark/, /\bkpi\b/, 'సూచిక', 'పనితీరు', /performance/, 'ర్యాంకింగ్', /ranking/, 'విశ్లేషణ', /analysis/, /measure/),
  rule('Radar', 'నిఘా', /monitor/, 'పర్యవేక్షణ', /intelligen/, /surveillance/, /tracking/),
  rule('Flame', 'థర్మల్', /thermal/, /blanch/, /pasteur/, /steriliz/, /canning/, /retort/, /evaporat/, /concentrat/),
  rule('Sun', 'ఎండబెట్ట', /dry(ing|ers?)\b/, /dehydrat/, 'డ్రయింగ్', 'డీహైడ్రేషన్', /curing/, 'క్యూరింగ్'),
  rule('Filter', 'గ్రేడింగ్', 'గ్రేడ్', /grading/, /\bgrades?\b(?!-)/, /sorting/, /trimming/, /grader/),
  rule('Sparkles', /cleaning/, /washing/),
  rule('Cog', 'యంత్రాలు', 'యంత్రాల', /machin/, /equipment/, /crusher/, /pulper/, /dehusker/, /grinding/),
  rule('Atom', /nano/, /encapsul/, /extrusion/, /novel/, 'టెక్నిక్', /technique/),
  rule('Droplet', /extract/, 'ఎక్స్‌ట్రాక్షన్', /separat/, 'సెపరేషన్', /juice/, /pulp/),
  rule('Copyright', /trademark/, /copyright/, /\bipr\b/, 'బ్రాండ్-రక్షణ'),
  rule('ShoppingCart', /commerce/, 'కామర్స్', /\bondc\b/, /online-marketplace/, /\bgem\b/, /\bd2c\b/),
  rule('Megaphone', /marketing/, 'మార్కెటింగ్', /brand/, 'బ్రాండ', /campaign/, 'క్యాంపెయిన్', /promotion/, /\batl\b/, /advertis/),
  rule('Presentation', /trade fair/, /\bevents?\b/, /event-model/, /buyer-seller/, /world food india/, /consultation/),
  rule('UserPlus', 'కొనుగోలుదారు', /buyer/),
  rule('ShoppingBasket', /purchas/, /sourcing/, 'కొనుగోలు'),
  rule('IdCard', 'నమోదు', 'రిజిస్ట్రేషన్', /registration/, /licen[cs]/, 'లైసెన్స్', /(?<!iso\/)\biec\b/, /rcmc/, /udyam/, /\bgst\b/, /\biem\b/, /onboarding/, 'అనుమతి', /permit/),
  rule('MonitorSmartphone', 'డిజిటల్', /digital/, 'డేటా', /\bdata/, /software/, /\berp\b/, /\biot\b/, /\bai-based/, /\bmis\b/, /portal/, 'పోర్టల్', /platform/, /online/, 'ఆన్‌లైన్', /technolog/, 'టెక్నాలజీ', 'సాంకేతిక', /\bsmart/, /foscos/, /\bpfms\b/),
  rule('Users', 'సామాజిక', /gender/, /social/, 'సహకార', /cooperat/, /\bfpo\b/, /stakeholder/, 'మనుషులు', /people/, /farmer/, 'రైతు', /beneficiar/),
  rule('HardHat', 'శ్రామిక', /labou?r/, 'కార్మిక', /worker/),
  rule('Landmark', 'ప్రభుత్వ', /govt/, /government/, 'మంత్రిత్వ', /ministry/, /mofpi/, 'బోర్డు', /\bboards?\b/, 'అథారిటీ', /authorit/, /governance/, 'గవర్నెన్స్', 'సంస్కరణ', /reform/, 'పరిపాలన', 'సంస్థాగత', 'సంస్థల', /institution/, /policy/),
  rule('Scale', 'చట్ట', /\bact\b/, /\blaws?\b/, /legal/, 'నియమాలు', 'నిబంధన', /\brules\b/, /regulat/, 'శాసనబద్ధ', /corruption/, /integrity/, 'వివాద', /dispute/),
  rule('ChartPie', /quota/, /allocation/),
  rule('Store', 'మార్కెట్', /market/, /\bapmc\b/, /\baplm\b/, /\benam\b/, 'వాణిజ్య', /\btrade\b/, /trading/, 'ట్రేడింగ్', /retail/, 'రిటైల్', /channel/, 'ఛానెల్', 'ఛానల్', /distribution/, 'విక్రయ', /sales/, 'పంపిణీ'),
  rule('Ship', 'ఎగుమతి', /export/, /merchant/, /shipment/),
  rule('DraftingCompass', 'రూపకల్పన', /design/, /layout/),
  rule('Droplets', 'నేల-రహిత', 'నీరు', 'నీటి', /water/, /irrigat/, 'డ్రైనేజ', /drainage/, 'తేమ', /moisture/),
  rule('MapPin', /\bodop\b/, 'జిల్లా', /district/, /geographical/, /\bgi\b/, /(?:^|\s)స్థల/, /\bsite\b/, 'సైట్', /mapping/, 'మ్యాపింగ్', 'భూమి', /\bland\b/),
  rule('Recycle', 'వ్యర్థ', /waste/, /by-product/, 'బై-ప్రొడక్ట్', 'ఉప-ఉత్పత్తు', /effluent/, /\betp\b/, /cetp/, /compost/, /circular/, /recycl/, /valori/, 'నష్ట', /\bloss/),
  rule('Leaf', 'సేంద్రియ', /organic/, 'ప్రకృతి వ్యవసాయ', /zbnf|spnf|apcnf/, 'మొక్క', 'జీవ వైవిధ్య', /biodivers/),
  rule('Zap', 'శక్తి', /energy/, /solar/, /renewable/),
  rule('Trees', 'పర్యావరణ', /environment/, /\bngt\b/, /pollution/),
  rule('Shovel', 'నేల', /\bsoil/, 'కలుపు', /weed/, 'సేద్య', /allelopath/, /tillage/),
  rule('FlaskRound', 'ఎరువు', /fertili/, 'పోషణ', 'పోషక', /nutri(ent|tion)/, 'ఇన్‌పుట్', /\binputs?\b/, /\bpgr\b/),
  rule('Sprout', 'విత్తన', 'నారు', 'నర్సరీ', /nursery/, /\bseeds?\b/, 'రకాల ఎంపిక', 'రకం ఎంపిక', /variet/, 'నాటడం', /planting/, 'సాంద్రత'),
  rule('Tent', 'రక్షిత', /polyhouse/, /greenhouse/, /protected/),
  rule('Apple', 'పరిపక్వత', /maturity/, /ripen/, /degreen/),
  rule('Wheat', 'కోత', /harvest/, 'దిగుబడి', /\byield/, 'పంట', /\bcrops?\b/, /cereal/),
  rule('Factory', 'ప్రాసెసింగ్', /processing/, 'ప్రాసెస్', /\bpark\b/, /cluster/, 'క్లస్టర్', /manufactur/),
  rule('Rocket', /entrepreneur/, /incubat/, 'ఇంక్యుబే', /startup/, /business-failure/, /management abilities/),
  rule('ClipboardList', 'రికార్డు', /record/, /\bsops?\b/, /checklist/, 'మూల్యాంకన', /evaluat/, /\bdpr\b/, /review/, /report/, /methodolog/),
  rule('Waypoints', 'సరఫరా గొలుసు', /supply[- ]chain/, 'సప్లై-చైన్', /linkage/, 'గొలుసు'),
  rule('Award', 'నాణ్యత', 'క్వాలిటీ', /quality/, /\bqc\b/, 'గుణమాన', 'స్వచ్ఛత', /purity/, 'కలుషిత', /contamin/),
  rule('Globe', 'అంతర్జాతీయ', /international/, /global/, 'గ్లోబల్', 'దేశ', /\beu\b/, 'విదేశ', /country/, /world/),
  rule('BadgeCheck', 'ధృవీకరణ', /certif/, 'సర్టిఫికేషన్', 'సర్టిఫికెట్', /\bics\b/, /\biso\b/, /nsqf/, /ficsi/, 'ప్రమాణ', /standard/, /compliance/, 'అనుకూలత', 'అనుసరణ', /fssai/),
  rule('Building2', 'మౌలిక', /infrastruct/, /\binfra\b/, /facilit/, 'సదుపాయ', 'స్థాపన', /establish/, /\bunits?\b/, /enterprise/),
  rule('ListTree', 'వర్గీకరణ', /classif/, /lookup/, /taxonom/, 'టాక్సానమీ', /categor/, 'వర్గాల', /\blevels?\b/, /\btypes?\b/),
];

// Fallback for the data's own tags when no keyword matches
const TAG_ICONS = {
  COLD: 'Snowflake', PKG: 'Package', 'FIN-INS': 'Umbrella', FIN: 'Banknote', LAB: 'Microscope',
  CERT: 'BadgeCheck', TRANS: 'Truck', SOIL: 'Shovel', WATER: 'Droplets', SEED: 'Sprout',
  HARV: 'Wheat', TRAIN: 'GraduationCap', TECH: 'MonitorSmartphone', MRKT: 'Store', EXPT: 'Ship',
  PACK: 'Filter', PROC: 'Factory', WASTE: 'Recycle', QC: 'Award', ESG: 'Leaf', LAND: 'MapPin',
  LABR: 'HardHat', TRACE: 'QrCode', GOVT: 'Landmark',
};

export const SEGMENT_ICONS = {
  FarmGate: 'Tractor',
  Market: 'Store',
  ValueAddition: 'Factory',
  Exports: 'Ship',
};

export const LAYER_ICONS = { PRODUCT: 'Sprout', ENTERPRISE: 'Building2' };

const matches = (text, m) => (typeof m === 'string' ? text.includes(m) : m.test(text));

export function iconFromName(name, seg) {
  const text = String(name).toLowerCase();
  const hit = RULES.find((r) => (!r.seg || r.seg === seg) && r.match.some((m) => matches(text, m)));
  return hit?.icon;
}

// Divisions without a keyword match inherit their category's icon, so
// siblings stay visually related.
export function nodeIcon(node, seg, parentIcon) {
  return iconFromName(node.name, seg) || parentIcon || TAG_ICONS[node.tag] || SEGMENT_ICONS[seg];
}
