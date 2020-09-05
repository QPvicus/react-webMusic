import React, { memo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerBarWrapper, Control, PlayInfo, Operate } from "./style";
import { Slider } from "antd";
import { getSongDetailAction } from "../store/actionCreator";
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
	const { currentSong } = useSelector(state => ({
		currentSong: state.getIn(["player", "currentSong"])
	}));

	const audioRef = useRef();
	useEffect(() => {
		dispatch(getSongDetailAction(1408364353));
	}, [dispatch]);
	useEffect(() => {
		audioRef.current.src = getPlaySong(currentSong.id);
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
		if (!isChanging) {
			setCurrentTime(e.target.currentTime * 1000);
			setProgress((currentTime / duration) * 100);
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
					<button className="prev sprite_player"></button>
					<button
						className="play sprite_player"
						onClick={e => playMusic()}
					></button>
					<button className="next sprite_player"></button>
				</Control>
				<PlayInfo>
					<div className="image">
						<a href="/#">
							<img src={getSizeImage1(picUrl, 34)} alt="" />
						</a>
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
				<Operate>
					<div className="left">
						<button className="btn sprite_player favor"></button>
						<button className="btn sprite_player share"></button>
					</div>
					<div className="right sprite_player">
						<button className="btn sprite_player volume"></button>
						<button className="btn sprite_player loop"></button>
						<button className="btn sprite_player playlist"></button>
					</div>
				</Operate>
				<audio ref={audioRef} onTimeUpdate={timeUpdate} />
			</div>
		</PlayerBarWrapper>
	);
});
