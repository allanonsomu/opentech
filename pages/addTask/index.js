import { DocComponent } from '@/components/doc/common/doccomponent';
import { FormInput } from '@/components/doc/captureform/recordform';


const LoginForm = () => {
    const form = [
        {
            id: '',
            label: 'Record Issue',
            component: FormInput
        }
    ];

    return <DocComponent title="OpenTech Task Management" header="OpenTech Task Management" componentDocs={form} hideTabMenu />;
};

export default LoginForm;
