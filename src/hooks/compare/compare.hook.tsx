import usePrevious from 'hooks/previous';

/** checks if the given value has changed */
const useCompare = (valueToCheck: any): boolean => {
	const prevValue = usePrevious(valueToCheck);
	return prevValue !== valueToCheck;
};

export default useCompare;