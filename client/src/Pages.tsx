import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group'
import Welcome from './pages/Welcome';
import Create from './pages/Create';
import Join from './pages/Join'
import { actions, AppPage, state } from './state';
import { useSnapshot } from 'valtio';
import { WaitingRoom } from './pages/WaitingRoom';
import { Voting } from './pages/Voting';

const routeConfig = {
	[AppPage.Welcome]: Welcome,
	[AppPage.Create]: Create,
	[AppPage.Join]: Join,
	[AppPage.WaitingRoom]: WaitingRoom,
	[AppPage.Voting]: Voting,
};

const Pages: React.FC = () => {
	const currentState = useSnapshot(state);

	useEffect(() => {
		if (currentState.me?.id && currentState.poll && !currentState.poll?.hasStarted) {
			actions.setPage(AppPage.WaitingRoom);
		}

		if (currentState.me?.id && currentState.poll?.hasStarted) {
			actions.setPage(AppPage.Voting);
		}
	}, [currentState.me?.id, currentState.poll?.hasStarted]);

	return (
		<>
			{Object.entries(routeConfig).map(([page, Component]) => (
				<CSSTransition
					key={page}
					in={page === currentState.currentPage}
					timeout={300}
					classNames="page"
					unmountOnExit
				>
					<div className="page mobile-height max-w-screen-sm mx-auto py-8 px-4 overflow-y-auto">
						<Component />
					</div>
				</CSSTransition>
			))}
		</>

	);
};

export default Pages;