import React from 'react';
import { Table } from 'react-bootstrap';

function ListItem({ carrierList }) {
	return (
		<div>
			<Table bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Carrier Names</th>
					</tr>
				</thead>
				<tbody>
					{carrierList.map((value, index) => {
						return (
							<tr key={index + 1}>
								<td>{index + 1}</td>
								<td>{value}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}

export default ListItem;
