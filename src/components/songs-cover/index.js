import React, { memo } from "react";
import { ThemeCoverWrapper } from "./style";
import { getCount, getSizeImage } from "@/utils/format-utils";
export default memo(function TSSongsCover(props) {
	const { info } = props;

	return (
		<ThemeCoverWrapper>
			<div className="cover-top">
				<img src={getSizeImage(info.picUrl, 140)} alt={info.name} />
				<div className="cover sprite_cover">
					<div className="info sprite_cover">
						<span>
							<i className="sprite_icon erji"></i>
							{getCount(info.playCount)}
						</span>
						<span>
							<i className="sprite_icon play"></i>
						</span>
					</div>
				</div>
			</div>
			<div className="cover-bottom text-nowrap">{info.name}</div>
			<div className="cover-source text-nowrap">
				by {info.copywriter || info.creator.nickname}
			</div>
		</ThemeCoverWrapper>
	);
});
