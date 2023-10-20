import { mapFace } from '~~/apis/types'

//游戏标签筛选列表
export const GameTagList = [
	{ value: GameTagEnum.highPayOut, name: 'NH0007' },
	{ value: GameTagEnum.highMultiple, name: 'NH0008' },
	{ value: GameTagEnum.easyWin, name: 'NH0009' },
	{ value: GameTagEnum.fortune, name: 'NH0010' },
	{ value: GameTagEnum.rocket, name: 'NH0011' },
	{ value: GameTagEnum.sport, name: 'NH0012' },
	{ value: GameTagEnum.dice, name: 'NH0013' },
	{ value: GameTagEnum.poker, name: 'NH0014' },
	{ value: GameTagEnum.roulette, name: 'NH0015' },
	{ value: GameTagEnum.wheel, name: 'NH0016' },
	{ value: GameTagEnum.table, name: 'NH0017' },
	{ value: GameTagEnum.fruit, name: 'NH0018' },
	{ value: GameTagEnum.stickyWids, name: 'NH0019' },
	{ value: GameTagEnum.magic, name: 'NH0020' },
	{ value: GameTagEnum.horror, name: 'NH0021' },
	{ value: GameTagEnum.egyptian, name: 'NH0022' },
	{ value: GameTagEnum.animats, name: 'NH0023' },
	{ value: GameTagEnum.dragon, name: 'NH0024' },
	{ value: GameTagEnum.candy, name: 'NH0025' },
]

export const SportList = [
	{ icon: 'sport-bets', name: 'My Bets', text: 'L1051', path: '/bets' },
	{ icon: 'sport-live', name: 'Live Events', text: 'L1052', path: '/live' },
	{ icon: 'sport-upcoming', name: 'Upcoming Events', text: 'L1053', path: '/schedule' },
	{ icon: 'sport-brasileiro', name: 'Brasileiro Serie A', path: '/soccer/brazil/brasileiro-serie-a-1669818812230406144' },
	{ icon: 'sport-brasileiro', name: 'Brasileiro Serie B', path: '/soccer/brazil/brasileiro-serie-b-1669818814746988544' },
	{ icon: 'sport-premier', name: 'Premier League', path: '/soccer/england/premier-league-1669818860469096448' },
	{ icon: 'ball', name: 'Soccer', text: 'L1054', path: '/soccer-1' },
	{ icon: 'sport-fifa', name: 'FIFA', path: '/fifa-300' },
	{ icon: 'sport-american', name: 'American Football', text: 'L1055', path: '/american-football-16' },
	{ icon: 'sport-badminton', name: 'Badminton', path: '/badminton-31' },
	{ icon: 'sport-dota', name: 'DOTA2', path: '/dota-2-111' },
	{ icon: 'sport-strike', name: 'Counter-Strike', path: '/counter-strike-109' },
]

//新增游戏标签
export const GameTagLangMaps: mapFace = {
	[GameTagEnum.highPayOut]: 'NH0007',
	[GameTagEnum.highMultiple]: 'NH0008',
	[GameTagEnum.easyWin]: 'NH0009',
	[GameTagEnum.fortune]: 'NH0010',
	[GameTagEnum.rocket]: 'NH0011',
	[GameTagEnum.sport]: 'NH0012',
	[GameTagEnum.dice]: 'NH0013',
	[GameTagEnum.poker]: 'NH0014',
	[GameTagEnum.roulette]: 'NH0015',
	[GameTagEnum.wheel]: 'NH0016',
	[GameTagEnum.table]: 'NH0017',
	[GameTagEnum.fruit]: 'NH0018',
	[GameTagEnum.stickyWids]: 'NH0019',
	[GameTagEnum.magic]: 'NH0020',
	[GameTagEnum.horror]: 'NH0021',
	[GameTagEnum.egyptian]: 'NH0022',
	[GameTagEnum.animats]: 'NH0023',
	[GameTagEnum.dragon]: 'NH0024',
	[GameTagEnum.candy]: 'NH0025',
}
