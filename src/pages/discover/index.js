import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { DiscoverMenu } from "@/common/local-data";
import { DiscoverWrapper, TopMenu } from "./style";
// import request from "@/services/request";

export default memo(function HYDiscover(props) {
	const { route } = props;

	return (
		<DiscoverWrapper>
			<div className="top">
				<TopMenu className="wrap-v1">
					{DiscoverMenu.map((item, index) => {
						return (
							<div className="item" key={item.title}>
								<NavLink to={item.link}>{item.title}</NavLink>
							</div>
						);
					})}
				</TopMenu>
			</div>
			{renderRoutes(route.routes)}
		</DiscoverWrapper>
	);
});
