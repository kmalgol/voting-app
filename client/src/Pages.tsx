import React from 'react';
import { CSSTransition } from 'react-transition-group'
import Welcome from './pages/Welcome';
import Create from './pages/Create';
import Join from './pages/Join'
import { AppPage, state } from './state';
import { useSnapshot } from 'valtio';

const routeConfig = {
	[AppPage.Welcome]: Welcome,
	[AppPage.Create]: Create,
	[AppPage.Welcome]: Join,
};

const Pages: React.FC = () => {
	const currentState = useSnapshot(state);
	return (
		<>
			{Object.entries(routeConfig).map(([page, Component]) => (
				<CSSTransition
					key={page}
					in={page === currentState.currentPage}
					timeout={300}
					classNames='page'
					unmountOnExit
				>
					<div className='page mobile-height max-w-screen-sm mx-auto py-8 px-4 overflow-y-auto'>
						<Component />
					</div>
				</CSSTransition>
			))}
		</>

	);
};

export default Pages;