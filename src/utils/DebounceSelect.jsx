
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { useMemo, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const DebounceSelect = ({ service, debounceTimeout = 800, ...props }) => {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const fetchOptions = useCallback(async (itemTitle) => {

        try {
            const { data, status } = await service.getAllItems();
            if (status === 200) {
                return data.filter(item => item.title.toLowerCase().includes(itemTitle.toLowerCase()))
                    .map(item => ({
                        label: item.title,
                        value: item.id,
                    }));
            }

        } catch (err) {
            toast.error("There was an error receiving data.");
        }

    }, [service])

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {

            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {

                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

export default DebounceSelect;