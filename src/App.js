import React, { memo } from "react";
import { renderRoutes } from "react-router-config";
import routes from "./router";
import { Provider } from "react-redux";
import store from "./store";

import TSAppHeader from "@/components/app-header";
import TSAppFooter from "@/components/app-footer";
import TSAppPlayerBar from "@/pages/player/app-player-bar";
import { HashRouter } from "react-router-dom";

export default memo(function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<TSAppHeader />
				{renderRoutes(routes)}
				<TSAppFooter />
			</HashRouter>
			<TSAppPlayerBar />
		</Provider>
	);
});
