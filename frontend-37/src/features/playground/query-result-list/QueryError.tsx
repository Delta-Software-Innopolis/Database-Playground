interface QueryErrorProps {
	error: string;
}

export function QueryError({ error }: QueryErrorProps) {
	return (
		<div>
			{error}
		</div>
	)
}
