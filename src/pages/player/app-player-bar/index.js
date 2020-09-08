import React, { memo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerBarWrapper, Control, PlayInfo, Operate } from "./style";
import { NavLink, HashRouter } from "react-router-dom";
import { Slider, message } from "antd";
import {
	getSongDetailAction,
	changeSequenceAction,
	changeCurrentSong,
	changeCurrentLyricIndexAction
} from "../store/actionCreator";
import {
	getSizeImage1,
	formatMinuteSecond,
	getPlaySong
} from "@/utils/format-utils";
import { useRef } from "react";
export default memo(function TSAppPlayBar() {
	const [currentTime, setCurrentTime] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isChanging, setIsChanging] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const dispatch = useDispatch();
	const { currentSong, sequence, lyricList, currentLyricIndex } = useSelector(
		state => ({
			currentSong: state.getIn(["player", "currentSong"]),
			sequence: state.getIn(["player", "sequence"]),
			lyricList: state.getIn(["player", "lyricList"]),
			currentLyricIndex: state.getIn(["player", "currentLyricIndex"])
		})
	);

	const audioRef = useRef();
	useEffect(() => {
		dispatch(getSongDetailAction(1408364353));
	}, [dispatch]);
	useEffect(() => {
		audioRef.current.src = getPlaySong(currentSong.id);
		audioRef.current
			.play()
			.then(res => {
				setIsPlaying(true);
			})
			.catch(err => {
				setIsPlaying(false);
			});
	}, [currentSong]);
	// other handle
	const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
	const ar_name = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
	const duration = currentSong.dt;
	const showDuration = formatMinuteSecond(currentSong.dt || 0);
	const showCurrentTime = formatMinuteSecond(currentTime);

	// handle Function
	const playMusic = useCallback(() => {
		isPlaying ? audioRef.current.pause() : audioRef.current.play();
		setIsPlaying(!isPlaying);
	}, [isPlaying]);
	const timeUpdate = e => {
		const currentTime = e.target.currentTime;
		if (!isChanging) {
			setCurrentTime(currentTime * 1000);
			setProgress(((currentTime * 1000) / duration) * 100);
		}

		// 获取当前歌词
		let i = 0;
		for (; i < lyricList.length; i++) {
			let lyricItem = lyricList[i];
			if (currentTime * 1000 < lyricItem.time) {
				break;
			}
		}
		// console.log(lyricList[i - 1]);
		if (currentLyricIndex !== i - 1) {
			dispatch(changeCurrentLyricIndexAction(i - 1));
			const content = lyricList[i - 1] && lyricList[i - 1].content;
			message.open({
				key: "lyric",
				content,
				duration: 0,
				className: "lyric-class"
			});
		}
	};

	const changeSequence = () => {
		let currentSequence = sequence + 1;
		if (currentSequence > 2) {
			currentSequence = 0;
		}
		dispatch(changeSequenceAction(currentSequence));
	};

	const changeMusic = tag => {
		dispatch(changeCurrentSong(tag));
	};

	const handleMusicEnded = () => {
		if (sequence === 2) {
			// 单曲循环
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		} else {
			dispatch(changeCurrentSong(1));
		}
	};

	const sliderChange = useCallback(
		value => {
			setIsChanging(true);
			const currentTime = (value / 100) * duration;
			setCurrentTime(currentTime);
			setProgress(value);
		},
		[duration]
	);

	const sliderAfterChange = useCallback(
		value => {
			const currentTime = ((value / 100) * duration) / 1000;
			audioRef.current.currentTime = currentTime;
			setCurrentTime(currentTime * 1000);
			setIsChanging(false);

			if (!isPlaying) {
				playMusic();
			}
		},
		[duration, isPlaying, playMusic]
	);

	return (
		<PlayerBarWrapper className="sprite_player">
			<div className="content wrap-v2">
				<Control isPlaying={isPlaying}>
					<button
						className="prev sprite_player"
						onClick={e => changeMusic(-1)}
					></button>
					<button
						className="play sprite_player"
						onClick={e => playMusic()}
					></button>
					<button
						className="next sprite_player"
						onClick={e => changeMusic(1)}
					></button>
				</Control>
				<PlayInfo>
					<div className="image">
						<HashRouter>
							<NavLink to="/discover/player">
								<img src={getSizeImage1(picUrl, 34)} alt="" />
							</NavLink>
						</HashRouter>
					</div>
					<div className="info">
						<div className="song">
							<span className="song-name">{currentSong.name}</span>
							<a href="/#" className="singer-name">
								{ar_name}
							</a>
						</div>
						<div className="progress">
							<Slider
								defaultValue={30}
								value={progress}
								onChange={sliderChange}
								onAfterChange={sliderAfterChange}
							/>
							<div className="time">
								<span className="now-time">{showCurrentTime}</span>
								<span className="divider">/</span>
								<span className="duration">{showDuration}</span>
							</div>
						</div>
					</div>
				</PlayInfo>
				<Operate sequence={sequence}>
					<div className="left">
						<button className="btn sprite_player favor"></button>
						<button className="btn sprite_player share"></button>
					</div>
					<div className="right sprite_player">
						<button className="btn sprite_player volume"></button>
						<button
							className="btn sprite_player loop"
							onClick={e => changeSequence()}
						></button>
						<button className="btn sprite_player playlist"></button>
					</div>
				</Operate>
				<audio
					ref={audioRef}
					onTimeUpdate={e => timeUpdate(e)}
					onEnded={e => handleMusicEnded()}
				/>
			</div>
		</PlayerBarWrapper>
	);
});
