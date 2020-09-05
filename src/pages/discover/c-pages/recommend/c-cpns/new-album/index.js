import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Carousel } from "antd";
import TSThemeHeaderRCM from "@/components/theme-header-rcm";
import TSAlbumCover from "@/components/album-cover";
import { getNewAlbumsAction } from "../../store/actionCreators";
import { AlbumWrapper } from "./style";

export default memo(function TSNewAlbum() {
	const dispatch = useDispatch();
	const pageRef = useRef();
	const { newAlbums } = useSelector(
		state => ({
			newAlbums: state.getIn(["recommend", "newAlbums"])
		}),
		shallowEqual
	);
	useEffect(() => {
		dispatch(getNewAlbumsAction(10));
	}, [dispatch]);
	return (
		<AlbumWrapper>
			<TSThemeHeaderRCM title="新碟上架" />
			<div className="content">
				<button
					className="arrow arrow-left sprite_02"
					onClick={() => pageRef.current.prev()}
				></button>
				<div className="album">
					<Carousel dots={false} ref={pageRef}>
						{[0, 1].map((item, index) => {
							return (
								<div key={item} className="page">
									{newAlbums
										.slice(item * 5, (item + 1) * 5)
										.map((item1, index1) => {
											return (
												<TSAlbumCover
													key={item1.id}
													info={item1}
													size={100}
													width={118}
													bgp={"-570px"}
												/>
											);
										})}
								</div>
							);
						})}
					</Carousel>
				</div>
				<button
					className="arrow arrow-right sprite_02"
					onClick={() => pageRef.current.next()}
				></button>
			</div>
		</AlbumWrapper>
	);
});
