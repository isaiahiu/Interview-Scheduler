import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem({selected, spots, setDay, name}) {
	const dayClass = classNames("day-list__item", {
		"day-list__item--selected": selected,
		"day-list__item--full": spots === 0,
	});

	// function here to display correct HTML text based on # of spots 
	const formatSpots = spots => {
		if (spots === 0) {
			return "no spots remaining";
		} else if (spots === 1) {
			return `${spots} spot remaining`;
		} else if (spots > 1) {
			return `${spots} spots remaining`;
		}
	};

	return (
		<li className={dayClass} onClick={setDay} data-testid='day'>
			<h2 className='text--regular'>{name}</h2>
			<h3 className='text--light'>{formatSpots(spots)}</h3>
		</li>
	);
}
