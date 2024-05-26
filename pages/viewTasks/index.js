import { DocComponent } from '@/components/doc/common/doccomponent';
import { CheckboxRowSelectionDoc } from '@/components/doc/viewTasks/viewtaskstable';


const DataTableDemo = () => {
    const docs = [
        {
            id: 'issues',
            label: 'Issues Table',
            component: CheckboxRowSelectionDoc

        },
    ];

    return (
        <DocComponent title="Assigned Issues Management" header="Issues Management" componentDocs={docs} />
    );
};

export default DataTableDemo;
