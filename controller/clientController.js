import Client from '../models/Client.js';


export async function createClient (req, res)  {
    const { name, email, phone, address } = req.body;

    try {
        const client = new Client({ name, email, phone, address });
        await client.save();
        res.status(201).json({ message: 'Client created successfully', client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


export async function updateClient (req, res)  {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    try {
        let client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        client.name = name || client.name;
        client.email = email || client.email;
        client.phone = phone || client.phone;
        client.address = address || client.address;

        await client.save();
        res.status(200).json({ message: 'Client updated successfully', client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



 
export async function deleteClient (req, res)  {
        const { id } = req.params;
    
        try {
            console.log(`Attempting to delete client with id: ${id}`);
            const client = await Client.findById(id);
            if (!client) {
                console.log('Client not found');
                return res.status(404).json({ message: 'Client not found' });
            }
    
            await Client.findByIdAndDelete(id);
            console.log('Client deleted successfully');
            res.status(200).json({ message: 'Client deleted successfully' });
        } catch (error) {
            console.error('Error deleting client:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    };
    
    