import React, { memo } from "react";
import { PlayerWrapper, PlayerLeft, PlayerRight } from "./style";
export default memo(function TSPlayer() {
	return (
		<PlayerWrapper>
			<div className="content wrap-v2">
				<PlayerLeft>
					<h2>TS</h2>
				</PlayerLeft>
				<PlayerRight></PlayerRight>
			</div>
		</PlayerWrapper>
	);
});
