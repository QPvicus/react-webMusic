import * as actionTypes from "./constants";
import {
	getTopBanners,
	getHotRecommends,
	getTopList
} from "@/services/recommend";
import { getNewAlbums } from "@/services/recommend";

const changeTopBannersAction = res => ({
	type: actionTypes.CHANGE_TOP_BANNERS,
	topBanners: res.banners
});

const changeHotRecommendAction = res => ({
	type: actionTypes.CHANGE_HOT_RECOMMENDS,
	hotRecommends: res.result
});

const changeNewAlbumsAction = res => ({
	type: actionTypes.CHANGE_NEW_ALBUMS,
	newAlbums: res.albums
});
const changeUpRankingAction = res => ({
	type: actionTypes.CHANGE_UP_RANKING,
	upRanking: res.playlist
});
const changeNewRankingAction = res => ({
	type: actionTypes.CHANGE_NEW_RANKING,
	newRanking: res.playlist
});

const changeOriginRankingAction = res => ({
	type: actionTypes.CHANGE_ORIGIN_RANKING,
	originRanking: res.playlist
});

export const getTopBannerAction = () => {
	return dispatch => {
		getTopBanners().then(res => {
			dispatch(changeTopBannersAction(res));
		});
	};
};

export const getHotRecommendsAction = limit => {
	return dispatch => {
		getHotRecommends(limit).then(res => {
			// dispatch()
			dispatch(changeHotRecommendAction(res));
		});
	};
};

export const getNewAlbumsAction = limit => {
	return dispatch => {
		getNewAlbums(limit).then(res => {
			dispatch(changeNewAlbumsAction(res));
		});
	};
};

export const getTopListAction = idx => {
	return dispatch => {
		getTopList(idx).then(res => {
			switch (idx) {
				case 0:
					dispatch(changeUpRankingAction(res));
					break;
				case 1:
					dispatch(changeNewRankingAction(res));
					break;
				case 2:
					dispatch(changeOriginRankingAction(res));
					break;
				default:
			}
		});
	};
};
