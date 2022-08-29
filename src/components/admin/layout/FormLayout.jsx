
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSliceActions, useSliceService } from '../../../hooks/sliceHooks';
import ContentHeader from '../contents/content-header/ContentHeader';

const FormLayout = ({ typeName, children }) => {

    const actions = useSliceActions();
    const service = useSliceService();

    return (
        <>
            <ContentHeader
                title={`${typeName} ${service.name}`}
                icon={<ArrowLeftOutlined />}
                btnTitle="Back"
                action={actions.createFormCanceled}
            />
            
            {children}
        </>
    );
}

export default FormLayout;