import React from "react";
import Button from "../Button";

export default function Confirm({message, onConfirm, onCancel}) {
	return (
		<main className='appointment__card appointment__card--confirm'>
			<h1 className='text--semi-bold'>{message}</h1>
			<section className='appointment__actions'>
				<Button onClick={onConfirm} danger>
					Confirm
				</Button>
				<Button onClick={onCancel} danger>
					Cancel
				</Button>
			</section>
		</main>
	);
}
