import { useSliceService } from '../../../hooks/sliceHooks';
import ContentHeader from '../contents/content-header/ContentHeader';

const FormLayout = ({ typeName, children }) => {

    const service = useSliceService();

    return (
        <>
            <ContentHeader title={`${typeName} ${service.name}`} />
            
            {children}
        </>
    );
}

export default FormLayout;