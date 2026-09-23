import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "data");

const sources = [
  {id:"ks-tourism",publisher:"Kunshan Municipal People's Government",title:"Tourism Destinations",url:"https://www.ks.gov.cn/kss/Tourism/enlist_tt_hd.shtml",scope:"Whole-city destinations and recommended sites in Zhouzhuang, Jinxi, Qiandeng, Bacheng, Dianshanhu, Zhangpu, Huaqiao and central Kunshan."},
  {id:"ks-ich6",publisher:"Kunshan Municipal People's Government",title:"Sixth batch of representative intangible cultural heritage",url:"https://www.ks.gov.cn/kss/c112598/202406/154c05692c0e41e4b9503059cd0614b9.shtml",scope:"Nine named living-heritage practices, categories, declaring areas, protection units and official introductions."},
  {id:"ks-place-names",publisher:"Kunshan Municipal People's Government",title:"Third batch of Wu-culture protected place names",url:"https://www.ks.gov.cn/kss/c112598/202411/f07e2e41857040d7a1920a6353aeb24c.shtml",scope:"Official 212-name list covering natural features, settlements, roads, bridges, memorials and visitor places."},
  {id:"ks-heritage",publisher:"Kunshan Municipal People's Government",title:"Cultural relic protection overview",url:"https://www.ks.gov.cn/kss/c113206pu/202206/c405f8247cc64b2bb8b1e10d1dd01433.shtml",scope:"Counts and names of national and provincial protected cultural relic units."},
  {id:"ks-buildings6",publisher:"Kunshan Municipal People's Government",title:"Sixth batch of cultural relic units and second batch of controlled buildings",url:"https://data.ks.gov.cn/kss/whzc/202003/5cb76caf7f674f2ab395fcbdcc5dbe9b.shtml",scope:"Eleven cultural relic units and five controlled historic buildings."},
  {id:"ks-villages",publisher:"Kunshan Municipal People's Government",title:"Traditional village protection programme",url:"https://data.ks.gov.cn/kss/ghjh/202406/7392d5f1b13144459869fbec5c2a5a54/files/c725f479bee54e6faa6e5762d66630d3.pdf",scope:"Traditional villages, documented ICH coverage, fifth-batch projects and the Opera Hundred Plays Museum."},
  {id:"ks-food",publisher:"Kunshan Municipal People's Government",title:"Five award-winning Kunshan foods",url:"https://www.ks.gov.cn/kss/ttxw/202407/da6fe60d561c49deadce176ec2019bfb.shtml",scope:"Official descriptions of Aozao noodles, flour-coated June crab, Wansan pork shank, Taihe braised duck and Jinhua cured pork."},
  {id:"ks-wonton",publisher:"Kunshan Municipal People's Government",title:"A bowl of bubble wontons",url:"https://www.ks.gov.cn/kss/lvzx/202003/dc569bd8c1a346e8b8fa07b6deabc0fc.shtml",scope:"Dianshanhu old-street bubble wonton history and preparation."},
  {id:"ks-food-fair",publisher:"Kunshan Municipal People's Government",title:"2024 Kunshan food fair",url:"https://www.ks.gov.cn/kss/ksyw/202412/8808d9156d0f420695061e4a929cc296.shtml",scope:"Named Kunshan foods including Wansan pork shank and Zhengyi green rice dumplings."},
  {id:"ks-culture-policy",publisher:"Kunshan Municipal People's Government",title:"Tourism and cultural development plan",url:"https://www.ks.gov.cn/kss/c112598/201802/84e9f12b86e34c67940e35753455e343.shtml",scope:"Named cultural elements including Kunqu, Jinxi xuanjuan, ancient tiles, Qiandeng tea, Kunbei songs, Lujia dragon dance and Huaqiao silk-and-bamboo music."},
  {id:"ks-opera-museum",publisher:"Kunshan Municipal People's Government",title:"Opera Hundred Plays Museum",url:"https://www.ks.gov.cn/kss/ttxw/202311/c977360a7e914e0b9f0a5d5d379cdd9e.shtml",scope:"Museum opened in 2023, four permanent halls, 348 opera genres and more than 4,000 donated objects."},
  {id:"unesco-kunqu",publisher:"UNESCO",title:"Kun Qu Opera",url:"https://ich.unesco.org/en/RL/kun-qu-opera-00004",scope:"International intangible cultural heritage documentation for Kunqu opera."},
  {id:"ks-tinglin",publisher:"Kunshan Municipal People's Government",title:"Tinglin Garden",url:"https://www.ks.gov.cn/kss/zmjd/202403/8aa3e3aef8c74680805e7679031b5ab3.shtml",scope:"Tinglin Garden and the three Kunshan treasures: Kun stone, viburnum and twin lotus."}
];

const imageCatalog = {
  zhouzhuang:{path:"assets/cards/zhouzhuang.jpg",sourceUrl:sources[0].url,credit:"Kunshan Government tourism page — Zhouzhuang"},
  jinxi:{path:"assets/cards/jinxi.jpg",sourceUrl:sources[0].url,credit:"Kunshan Government tourism page — Jinxi"},
  qiandeng:{path:"assets/cards/qiandeng.jpg",sourceUrl:sources[0].url,credit:"Kunshan Government tourism page — Qiandeng"},
  bacheng:{path:"assets/cards/bacheng.jpg",sourceUrl:sources[0].url,credit:"Kunshan Government tourism page — Bacheng"},
  tianfu:{path:"assets/cards/tianfu.jpg",sourceUrl:sources[0].url,credit:"Kunshan Government tourism page — Tianfu Ecological Garden"},
  tinglin:{path:"assets/cards/tinglin.jpg",sourceUrl:sources[0].url,credit:"Kunshan Government tourism page — Tinglin Garden"},
  forest:{path:"assets/cards/forest.jpg",sourceUrl:sources[0].url,credit:"Kunshan Government tourism page — Forest Park"},
  kunqu:{path:"assets/cards/kunqu.jpg",sourceUrl:"https://commons.wikimedia.org/wiki/File:Kunqu_-_Dan.jpg",credit:"Wikimedia Commons — Kunqu performer photograph"},
  aozao:{path:"assets/cards/aozao.jpg",sourceUrl:sources[6].url,credit:"Kunshan Government — Aozao noodles"},
  crab:{path:"assets/cards/june-crab.jpg",sourceUrl:sources[6].url,credit:"Kunshan Government — flour-coated June crab"},
  wansan:{path:"assets/cards/wansan.jpg",sourceUrl:sources[6].url,credit:"Kunshan Government — Wansan pork shank"},
  duck:{path:"assets/cards/duck.jpg",sourceUrl:sources[6].url,credit:"Kunshan Government — Taihe braised duck"}
};

const rows = [];
const add = (id,category,name,nameZh,town,lat,lng,locationPrecision,imageKey,sourceIds,summary,placeId="") => rows.push({id,category,name,nameZh,short:name,area:town,town,lat,lng,locationPrecision,imageKey,sourceIds,summary,placeId});

// Places: specific-site coordinates where checked; otherwise explicitly labelled town-area anchors.
add("tinglin_garden","Places","Tinglin Garden","亭林园","Yushan",31.3864,120.9486,"specific-site","tinglin",["ks-tourism","ks-tinglin"],"Central Kunshan garden named for Gu Yanwu and associated with Kunshan's three treasures.");
add("forest_park","Places","Urban Ecological Forest Park","昆山城市生态森林公园","Yushan",31.4012,120.9099,"specific-site","forest",["ks-tourism"],"A large urban wetland and public park northwest of central Kunshan.");
add("opera_museum","Places","Opera Hundred Plays Museum","昆山戏曲百戏博物馆","Bacheng",31.4543,120.8802,"town-area anchor","bacheng",["ks-opera-museum","ks-villages"],"A museum presenting the history and diversity of Chinese opera genres.");
add("zhouzhuang_town","Places","Zhouzhuang Ancient Town","周庄古镇","Zhouzhuang",31.1168,120.8468,"specific-site","zhouzhuang",["ks-tourism"],"Historic water town with canals, bridges and riverside residences.");
add("twin_bridges","Places","Twin Bridges","双桥","Zhouzhuang",31.1149,120.8478,"specific-site","zhouzhuang",["ks-tourism"],"A paired bridge landmark within Zhouzhuang's canal network.","zhouzhuang_town");
add("zhang_hall","Places","Zhang's Hall","张厅","Zhouzhuang",31.1162,120.8471,"town-area anchor","zhouzhuang",["ks-tourism"],"A recommended historic residence in Zhouzhuang.","zhouzhuang_town");
add("shen_hall","Places","Shen's Hall","沈厅","Zhouzhuang",31.1155,120.8458,"town-area anchor","zhouzhuang",["ks-tourism"],"A recommended historic residence associated with the Shen family.","zhouzhuang_town");
add("zhenfeng_street","Places","Zhenfeng Cultural Street","贞丰文化街","Zhouzhuang",31.1170,120.8462,"town-area anchor","zhouzhuang",["ks-tourism"],"A named cultural street in Zhouzhuang.","zhouzhuang_town");
add("shen_residence","Places","Former Residence of Shen Wansan","沈万三故居","Zhouzhuang",31.1158,120.8453,"town-area anchor","zhouzhuang",["ks-tourism"],"A visitor site interpreting Shen Wansan in Zhouzhuang.","zhouzhuang_town");
add("chengxu_temple","Places","Chengxu Taoist Temple","澄虚道院","Zhouzhuang",31.1178,120.8490,"town-area anchor","zhouzhuang",["ks-tourism"],"A Taoist temple listed among Zhouzhuang's recommended sites.","zhouzhuang_town");
add("old_opera_stage","Places","Old Drama Stage","古戏台","Zhouzhuang",31.1174,120.8492,"town-area anchor","zhouzhuang",["ks-tourism"],"A performance site in Zhouzhuang's historic area.","zhouzhuang_town");
add("jinxi_town","Places","Jinxi Ancient Town","锦溪古镇","Jinxi",31.1787,120.9076,"specific-site","jinxi",["ks-tourism"],"Water town surrounded by lakes and known for folk museums.");
add("ancient_tile_museum","Places","Chinese Ancient Brick and Tile Museum","中国古砖瓦博物馆","Jinxi",31.1782,120.9066,"town-area anchor","jinxi",["ks-tourism","ks-culture-policy"],"Museum interpreting historic bricks, tiles and kiln culture.","jinxi_town");
add("clay_sculpture_hall","Places","Maruote Clay Sculpture Hall","马若特泥塑馆","Jinxi",31.1790,120.9069,"town-area anchor","jinxi",["ks-tourism"],"A folk-museum venue dedicated to clay sculpture.","jinxi_town");
add("jinxi_ballad_center","Places","Jinxi Ballad Art Center","锦溪宣卷艺术中心","Jinxi",31.1784,120.9080,"town-area anchor","jinxi",["ks-tourism","ks-culture-policy"],"A venue connected with Jinxi narrative-singing culture.","jinxi_town");
add("lianchi_temple","Places","Lianchi Temple","莲池禅院","Jinxi",31.1779,120.9091,"town-area anchor","jinxi",["ks-tourism"],"A temple listed among Jinxi's recommended sites.","jinxi_town");
add("concubine_tomb","Places","Concubine's Water Tomb","陈妃水冢","Jinxi",31.1796,120.9058,"town-area anchor","jinxi",["ks-tourism"],"A water-set memorial site central to one of Jinxi's best-known narratives.","jinxi_town");
add("wenchang_pavilion","Places","Wenchang Pavilion","文昌阁","Jinxi",31.1772,120.9075,"town-area anchor","jinxi",["ks-tourism"],"A pavilion in the Jinxi historic area.","jinxi_town");
add("zhudian_kiln","Places","Zhudian Ancient Brick Kiln","祝甸古砖窑","Jinxi",31.2060,120.8898,"specific-site","jinxi",["ks-tourism"],"A former kiln adapted as a museum of local brick-making history.");
add("qiandeng_town","Places","Qiandeng Ancient Town","千灯古镇","Qiandeng",31.2600,121.0032,"specific-site","qiandeng",["ks-tourism"],"Historic town associated with Gu Yanwu, Gu Jian, Kunqu and a long flagstone street.");
add("stone_street","Places","Ancient Flagstone Street","古石板街","Qiandeng",31.2593,121.0025,"specific-site","qiandeng",["ks-tourism"],"A 1,500-metre street lined with historic residences.","qiandeng_town");
add("gu_yanwu_residence","Places","Former Residence of Gu Yanwu","顾炎武故居","Qiandeng",31.2577,121.0004,"specific-site","qiandeng",["ks-tourism","ks-heritage"],"Nationally protected former residence linked to scholar Gu Yanwu.","qiandeng_town");
add("gu_jian_memorial","Places","Gu Jian Memorial Hall","顾坚纪念馆","Qiandeng",31.2607,121.0020,"town-area anchor","qiandeng",["ks-tourism"],"A memorial venue presenting Gu Jian and Kunqu origins.","qiandeng_town");
add("qinfeng_tower","Places","Qinfeng Tower and Yanfu Temple","秦峰塔与延福寺","Qiandeng",31.2614,121.0047,"specific-site","qiandeng",["ks-tourism","ks-heritage"],"A nationally protected pagoda and temple complex in Qiandeng.","qiandeng_town");
add("qiandeng_hall","Places","Qiandeng Hall","千灯馆","Qiandeng",31.2599,121.0038,"town-area anchor","qiandeng",["ks-tourism"],"A recommended cultural venue in Qiandeng.","qiandeng_town");
add("bacheng_town","Places","Bacheng Ancient Town","巴城老街","Bacheng",31.4540,120.8796,"specific-site","bacheng",["ks-tourism"],"Historic town area beside Yangcheng Lake.");
add("bajie_park","Places","Bajie Park","巴解园","Bacheng",31.4517,120.8680,"town-area anchor","bacheng",["ks-tourism"],"A Bacheng destination connected with local crab culture.","bacheng_town");
add("chongning_temple","Places","Chongning Temple","崇宁古寺","Bacheng",31.4547,120.8812,"town-area anchor","bacheng",["ks-tourism"],"A temple listed among Bacheng's visitor destinations.","bacheng_town");
add("yangcheng_wetland","Places","Yangcheng Lake Wetland Park","阳澄湖湿地公园","Bacheng",31.4320,120.8280,"town-area anchor","bacheng",["ks-tourism"],"Wetland destination beside Yangcheng Lake.","bacheng_town");
add("chaodun_site","Places","Chaodun Archaeological Site","绰墩遗址","Bacheng",31.4080,120.8660,"town-area anchor","bacheng",["ks-tourism","ks-heritage"],"A nationally protected archaeological site.");
add("dianshan_lake","Places","Dianshan Lake","淀山湖","Dianshanhu",31.1600,121.0010,"landscape anchor","tianfu",["ks-tourism"],"A major lake landscape shaping the identity of Dianshanhu town.");
add("liurudun","Places","Liurudun","六如墩","Dianshanhu",31.1470,121.0260,"town-area anchor","tianfu",["ks-tourism","ks-place-names"],"A named Dianshanhu destination also included in the protected place-name list.","dianshan_lake");
add("tianfu_garden","Places","Tianfu Ecological Garden","天福生态园","Huaqiao",31.2950,121.1340,"specific-site","tianfu",["ks-tourism"],"An ecological and agricultural visitor area centred on an old settlement.");
add("zhaoling_site","Places","Zhaoling Mountain Site","赵陵山遗址","Zhangpu",31.2420,120.9200,"town-area anchor","forest",["ks-heritage"],"A nationally protected archaeological site in Kunshan.");
add("yuyantang","Places","Yuyan Hall","玉燕堂","Zhouzhuang",31.1160,120.8460,"town-area anchor","zhouzhuang",["ks-heritage"],"A nationally protected historic hall.","zhouzhuang_town");
add("jingyetang","Places","Jingye Hall","敬业堂","Zhouzhuang",31.1165,120.8470,"town-area anchor","zhouzhuang",["ks-heritage"],"A nationally protected historic hall.","zhouzhuang_town");
add("wufeng_flour_mill","Places","Former Wufeng Flour Mill","五丰面粉厂旧址","Yushan",31.3740,120.9600,"district anchor","tinglin",["ks-heritage","ks-place-names"],"A provincially protected industrial heritage site.");
add("jishan_bridge","Places","Jishan Bridge","集善桥","Huaqiao",31.3110,121.1000,"town-area anchor","tianfu",["ks-heritage"],"A provincially protected historic bridge.");
add("yulong_bridge","Places","Yulong Bridge","玉龙桥","Zhouzhuang",31.1135,120.8495,"town-area anchor","zhouzhuang",["ks-heritage"],"A provincially protected historic bridge.","zhouzhuang_town");
add("xugongqiao_trial","Places","Xugongqiao Rural Reform Experimental Area","徐公桥乡村改进试验区旧址","Huaqiao",31.3240,121.1300,"town-area anchor","tianfu",["ks-heritage","ks-place-names"],"A provincially protected rural-reform historic site.");

// Artifacts: material culture represented by documented objects, collections or craft products.
add("kunshan_stone","Artifacts","Kunshan Stone","昆石","Yushan",31.3864,120.9486,"associated-site anchor","tinglin",["ks-tinglin","ks-tourism"],"One of the three treasures displayed and interpreted at Tinglin Garden.","tinglin_garden");
add("ancient_tiles","Artifacts","Ancient Bricks and Tiles","古砖瓦","Jinxi",31.1782,120.9066,"associated-site anchor","jinxi",["ks-tourism","ks-culture-policy"],"Architectural materials preserved and interpreted through Jinxi's museum collections.","ancient_tile_museum");
add("kiln_bricks","Artifacts","Zhudian Kiln Bricks","祝甸窑砖","Jinxi",31.2060,120.8898,"associated-site anchor","jinxi",["ks-tourism"],"Brick products and kiln traces used to interpret local production history.","zhudian_kiln");
add("opera_costume","Artifacts","Opera Costume Collection","戏曲服饰藏品","Bacheng",31.4543,120.8802,"associated-site anchor","kunqu",["ks-opera-museum"],"Performance costumes represented within the Opera Hundred Plays Museum collection.","opera_museum");
add("opera_objects","Artifacts","Opera Objects and Documents","戏曲器物与文献","Bacheng",31.4543,120.8802,"associated-site anchor","kunqu",["ks-opera-museum"],"Part of a museum collection built from more than 4,000 donated objects.","opera_museum");
add("clay_sculpture","Artifacts","Clay Sculpture","泥塑","Jinxi",31.1790,120.9069,"associated-site anchor","jinxi",["ks-tourism"],"Material folk art interpreted at the Maruote Clay Sculpture Hall.","clay_sculpture_hall");
add("paper_cut_object","Artifacts","Kunshan Paper-cut Work","昆山剪纸作品","Lujia",31.3190,121.0510,"town anchor","qiandeng",["ks-ich6"],"A finished paper-cut work associated with the locally listed craft tradition.","lujia_papercut");
add("rope_knot_object","Artifacts","Kunshan Knotwork Object","昆山绳结作品","Bacheng",31.4528,120.8840,"town anchor","bacheng",["ks-ich6"],"A hand-woven knotwork object created from recombined practical Chinese-knot structures.","kunshan_rope_knot");

// Food.
add("aozao_noodles","Food","Aozao Noodles","奥灶面","Yushan",31.3840,120.9590,"city anchor","aozao",["ks-food","ks-culture-policy"],"A representative Kunshan noodle tradition using local ingredients and a distinctive broth.","tinglin_garden");
add("flour_june_crab","Food","Flour-coated June Crab","面拖六月黄","Bacheng",31.4460,120.8510,"regional food anchor","crab",["ks-food"],"A Jiangnan dish made with tender June crabs from the Bacheng–Yangcheng Lake area.","bacheng_town");
add("wansan_pork","Food","Wansan Pork Shank","万三蹄","Zhouzhuang",31.1157,120.8455,"town anchor","wansan",["ks-food","ks-food-fair"],"A slow-braised pork shank associated with Zhouzhuang and Shen Wansan narratives.","shen_residence");
add("taihe_duck","Food","Taihe Braised Duck","太和爊鸭","Zhoushi",31.4560,120.9980,"town anchor","duck",["ks-food"],"A documented local duck preparation traced in the official account to the Guangxu era.");
add("jinhua_bacon","Food","Jinhua Village Steamed Cured Pork","金华村清蒸腊肉","Zhangpu",31.2600,120.9050,"village-area anchor","wansan",["ks-food","ks-villages"],"A preserved-pork tradition associated with Jinhua Village and included in Kunshan's fifth ICH batch.");
add("hairy_crab","Food","Yangcheng Lake Hairy Crab","阳澄湖大闸蟹","Bacheng",31.4460,120.8510,"regional food anchor","crab",["ks-tourism"],"A well-known Bacheng specialty linked to Yangcheng Lake.","bacheng_town");
add("sock_bottom_pastry","Food","Sock-bottom Pastry","袜底酥","Jinxi",31.1787,120.9076,"town anchor","jinxi",["ks-culture-policy"],"A crisp pastry associated with Jinxi food culture.","jinxi_town");
add("zhengyi_qingtuan","Food","Zhengyi Green Rice Dumpling","正仪青团","Bacheng",31.4070,120.8700,"town-area anchor","bacheng",["ks-food-fair"],"A green rice dumpling named in official Kunshan food-promotion material.","bacheng_town");
add("bubble_wonton","Food","Old-street Bubble Wonton","老街泡泡馄饨","Dianshanhu",31.1700,121.0050,"town anchor","tianfu",["ks-wonton"],"Very thin-skinned handmade wontons documented on Dianshanhu old street.","dianshan_lake");
add("apo_pickles","Food","Zhenfeng Granny Pickles","贞丰阿婆菜","Zhouzhuang",31.1168,120.8468,"town anchor","zhouzhuang",["ks-food-fair"],"A preserved vegetable food associated with Zhouzhuang's Zhenfeng area.","zhenfeng_street");
add("sealed_wine","Food","Zhouzhuang Sealed Wine","周庄封坛酒","Zhouzhuang",31.1190,120.8460,"town anchor","zhouzhuang",["ks-ich6"],"A rice wine linked to Zhouzhuang's documented sealed-wine brewing craft.","zhouzhuang_town");
add("copper_goose","Food","Copper-basin Braised Goose","铜盆红烧老鹅","Yushan",31.3900,120.9500,"district anchor","wansan",["ks-ich6"],"A traditional goose dish slow-cooked in a specially used copper basin.");

// Traditions.
add("kunqu_opera","Traditions","Kunqu Opera","昆曲","Kunshan",31.3847,120.9818,"city cultural anchor","kunqu",["unesco-kunqu","ks-culture-policy"],"An internationally recognised opera tradition that developed in the Kunshan region.","opera_museum");
add("jinxi_xuanjuan","Traditions","Jinxi Xuanjuan","锦溪宣卷","Jinxi",31.1784,120.9080,"associated-site anchor","jinxi",["ks-culture-policy","ks-villages"],"A local narrative-singing tradition associated with Jinxi.","jinxi_ballad_center");
add("qiandeng_tea","Traditions","Qiandeng Springboard Tea","千灯跳板茶","Qiandeng",31.2600,121.0032,"town anchor","qiandeng",["ks-culture-policy"],"A tea custom named in Kunshan's cultural planning material.","qiandeng_town");
add("kunbei_song","Traditions","Northern Kunshan Folk Songs","昆北民歌","Northern Kunshan",31.4700,120.9600,"regional anchor","forest",["ks-culture-policy"],"A folk-song tradition associated with northern Kunshan.");
add("lujia_dragon","Traditions","Lujia Duan Dragon Dance","陆家段龙舞","Lujia",31.3190,121.0510,"town anchor","qiandeng",["ks-culture-policy"],"A segmented-dragon dance tradition associated with Lujia.");
add("huaqiao_sizhu","Traditions","Huaqiao Jiangnan Sizhu","花桥江南丝竹","Huaqiao",31.3000,121.1100,"town anchor","tianfu",["ks-culture-policy"],"A Jiangnan silk-and-bamboo ensemble music tradition associated with Huaqiao.","tianfu_garden");
add("xu_massage","Traditions","Xu-style Massage","徐氏推拿技艺","Yushan",31.3900,120.9500,"district anchor","tinglin",["ks-ich6"],"A traditional medical practice listed in Kunshan's sixth ICH batch.");
add("zhoushi_stucco","Traditions","Zhoushi Stucco Modelling","堆塑技艺","Zhoushi",31.4560,120.9980,"town anchor","forest",["ks-ich6"],"An architectural decoration craft using lime paste, straw fibre, modelling and colour.");
add("lujia_papercut","Traditions","Kunshan Paper-cutting","昆山剪纸","Lujia",31.3190,121.0510,"town anchor","qiandeng",["ks-ich6"],"A fine-lined paper-cutting tradition related to embroidery pattern vocabularies.");
add("kunshan_rope_knot","Traditions","Kunshan Rope Knotting","昆山绳结","Bacheng",31.4528,120.8840,"town anchor","bacheng",["ks-ich6"],"A hand-weaving practice that recombines practical Chinese knots into decorative forms.","bacheng_town");
add("sealed_wine_craft","Traditions","Sealed-wine Brewing Craft","周庄封坛酒酿造技艺","Zhouzhuang",31.1190,120.8460,"town anchor","zhouzhuang",["ks-ich6"],"A Zhouzhuang rice-wine craft using local grain and water, with a documented wall-resting method.","zhouzhuang_town");
add("spring_ox","Traditions","Spring Ox Custom","打春牛","Zhouzhuang",31.1138,120.8501,"town anchor","zhouzhuang",["ks-ich6"],"A Zhouzhuang folk custom listed in Kunshan's sixth ICH batch.","zhouzhuang_town");
add("round_woodcraft","Traditions","Water-town Round Woodcraft","水乡圆作工艺","Jinxi",31.1768,120.9100,"town anchor","jinxi",["ks-ich6"],"A Jinxi woodworking tradition for round-form timber construction and objects.","jinxi_town");
add("longxing_qigong","Traditions","Longxing Fitness Practice","龙行健身功","Kunshan",31.3800,120.9800,"city anchor","forest",["ks-ich6"],"A traditional physical practice listed in Kunshan's sixth ICH batch.");

// Stories are clearly labelled as documented histories or locally transmitted narratives.
add("shen_wansan_story","Stories","Shen Wansan and Zhouzhuang","沈万三与周庄","Zhouzhuang",31.1157,120.8455,"associated-site anchor","zhouzhuang",["ks-tourism","ks-food"],"A place-linked narrative connecting Shen Wansan, his former residence and Zhouzhuang food culture.","shen_residence");
add("concubine_story","Stories","The Concubine's Water Tomb","陈妃水冢故事","Jinxi",31.1796,120.9058,"associated-site anchor","jinxi",["ks-tourism"],"A locally presented narrative linking Jinxi's water landscape with an emperor and his concubine.","concubine_tomb");
add("gu_yanwu_story","Stories","Gu Yanwu of Qiandeng","顾炎武与千灯","Qiandeng",31.2577,121.0004,"associated-site anchor","qiandeng",["ks-tourism","ks-heritage"],"Documented history connecting scholar Gu Yanwu with his Qiandeng birthplace and former residence.","gu_yanwu_residence");
add("gu_jian_story","Stories","Gu Jian and Kunqu Origins","顾坚与昆曲源流","Qiandeng",31.2607,121.0020,"associated-site anchor","kunqu",["ks-tourism"],"Qiandeng interpretation presents Gu Jian as an important figure in Kunqu's origins.","gu_jian_memorial");
add("jinxi_name_story","Stories","How Jinxi Received Its Name","锦溪地名故事","Jinxi",31.1787,120.9076,"town anchor","jinxi",["ks-tourism"],"The official tourism account relates the name Jinxi to light on a peach-lined river.","jinxi_town");
add("zhouzhuang_water_story","Stories","A Town Shaped by Water","水乡周庄","Zhouzhuang",31.1168,120.8468,"town anchor","zhouzhuang",["ks-tourism"],"A documented spatial story of canals, historic bridges and riverside residences.","zhouzhuang_town");
add("three_treasures_story","Stories","The Three Treasures of Kunshan","昆山三宝","Yushan",31.3864,120.9486,"associated-site anchor","tinglin",["ks-tourism","ks-tinglin"],"Tinglin Garden presents Kun stone, viburnum and twin lotus as Kunshan's three treasures.","tinglin_garden");
add("opera_city_story","Stories","348 Opera Genres in One Museum","百戏汇昆山","Bacheng",31.4543,120.8802,"associated-site anchor","kunqu",["ks-opera-museum"],"The Opera Hundred Plays Museum frames Kunshan as a meeting place for hundreds of Chinese opera genres.","opera_museum");

const imageFallback = {Places:"forest",Artifacts:"jinxi",Food:"aozao",Traditions:"kunqu",Stories:"zhouzhuang"};
const motifs = {Places:"地",Artifacts:"器",Food:"味",Traditions:"艺",Stories:"故"};
const fragments = rows.map(row => {
  const image = imageCatalog[row.imageKey] || imageCatalog[imageFallback[row.category]];
  return {...row,type:row.category,motif:motifs[row.category],image:image.path,imageSource:image.sourceUrl,imageCredit:image.credit};
});

const relationLabel = {Places:"Part of the same place system",Artifacts:"Material culture and place",Food:"Local food and place",Traditions:"Living tradition and place",Stories:"Place and documented memory"};
const relations = [];
const seen = new Set();
function relate(a,b,label,summary,sourceIds,strength="Official source association"){
  if(!a||!b||a===b)return;
  const key=[a,b].sort().join("|");
  if(seen.has(key))return;
  seen.add(key);
  relations.push({id:`rel_${relations.length+1}`,a,b,label,summary,sourceIds:[...new Set(sourceIds)],strength});
}
for(const fragment of fragments){
  if(!fragment.placeId)continue;
  const place=fragments.find(item=>item.id===fragment.placeId);
  if(!place)continue;
  relate(fragment.id,place.id,relationLabel[fragment.category],`${fragment.name} is documented in relation to ${place.name}. ${fragment.summary}`,[...fragment.sourceIds,...place.sourceIds]);
}
[
  ["kunqu_opera","gu_jian_story","Origins and performance tradition","Qiandeng interpretation of Gu Jian provides a place-based route into the history of Kunqu."],
  ["kunqu_opera","opera_museum","Living opera and museum evidence","Kunqu is a living tradition; the museum provides a wider material and comparative opera context."],
  ["ancient_tiles","zhudian_kiln","From kiln production to museum collection","Jinxi's kiln landscape and brick-and-tile museum together support a material-culture connection."],
  ["sealed_wine","sealed_wine_craft","Food product and brewing practice","The sealed wine is the product of the documented Zhouzhuang brewing craft."],
  ["paper_cut_object","lujia_papercut","Object and making practice","The paper-cut object is evidence of the listed Lujia-associated craft practice."],
  ["rope_knot_object","kunshan_rope_knot","Object and making practice","The knotwork object is produced through the listed Bacheng-associated rope-knot practice."],
  ["wansan_pork","shen_wansan_story","Food and transmitted story","The official food account connects Wansan pork shank with Shen Wansan and Zhouzhuang hospitality."],
  ["flour_june_crab","hairy_crab","Seasonal crab food culture","Both fragments are tied to crab food culture in the Bacheng–Yangcheng Lake area."],
  ["jinxi_name_story","concubine_story","Two narratives of Jinxi","The official tourism account presents both the town-name explanation and the concubine narrative as ways of reading Jinxi."],
  ["kunshan_stone","three_treasures_story","Object and civic cultural story","Kun stone is one of the three treasures interpreted at Tinglin Garden."],
  ["opera_objects","opera_city_story","Collection and museum narrative","The donated collection supports the museum's account of 348 opera genres."],
  ["aozao_noodles","kunqu_opera","Two distinct Kunshan cultural anchors","Official sources identify both as prominent but different parts of Kunshan culture; this is a thematic route prompt, not a causal claim.","Interpretive route prompt"]
].forEach(item=>{
  const [a,b,label,summary,strength] = item;
  const fa=fragments.find(x=>x.id===a),fb=fragments.find(x=>x.id===b);
  relate(a,b,label,summary,[...(fa?.sourceIds||[]),...(fb?.sourceIds||[])],strength||"Cross-source association");
});

const metadata = {
  title:"Kunshan Cultural Map — source-grounded working dataset",
  version:"1.0.0",
  updated:"2026-09-23",
  geography:"Kunshan, Jiangsu, China",
  categories:["Places","Artifacts","Food","Traditions","Stories"],
  method:"Curated synthesis of official Kunshan public records and UNESCO documentation. Raw official name lists are retained separately.",
  spatialNote:"Every entity has a geographic anchor and a locationPrecision label. Town, district, regional and associated-site anchors are not surveyed entrances and must not be used as navigation coordinates.",
  imageNote:"The web prototype uses cached real photographs from cited government pages and Wikimedia Commons. A contextual place photograph may be shared by multiple related records; no AI-generated historical object or place is presented as documentary evidence.",
  evidenceBoundary:"The dataset does not claim that visitors generally overlook lesser-known places, that current promotion is ineffective, or that the interface improves understanding. Those remain research hypotheses requiring evaluation."
};

const dataset = {metadata,counts:{fragments:fragments.length,relations:relations.length,sources:sources.length},fragments,relations,sources,imageCatalog};
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,"kunshan-cultural-dataset.json"),JSON.stringify(dataset,null,2)+"\n");

const csvCell=value=>`"${String(value??"").replaceAll('"','""')}"`;
const fragmentHeaders=["id","category","name","nameZh","town","lat","lng","locationPrecision","summary","sourceIds","image","imageSource","placeId"];
const fragmentCsv=[fragmentHeaders.map(csvCell).join(","),...fragments.map(item=>fragmentHeaders.map(key=>csvCell(key==="sourceIds"?item[key].join(";"):item[key])).join(","))].join("\n")+"\n";
fs.writeFileSync(path.join(out,"kunshan-cultural-entities.csv"),fragmentCsv);
const relationHeaders=["id","a","b","label","summary","strength","sourceIds"];
const relationCsv=[relationHeaders.map(csvCell).join(","),...relations.map(item=>relationHeaders.map(key=>csvCell(key==="sourceIds"?item[key].join(";"):item[key])).join(","))].join("\n")+"\n";
fs.writeFileSync(path.join(out,"kunshan-cultural-relations.csv"),relationCsv);
fs.writeFileSync(path.join(out,"sources.json"),JSON.stringify(sources,null,2)+"\n");
console.log(`Built ${fragments.length} entities, ${relations.length} relations and ${sources.length} sources.`);
